import { Like } from 'typeorm';
import { AddAdInput, UpdateAdInput } from '@/schemas/ads.schemas';
import { Ad } from '@/schemas/entities/Ad';
import { User } from '@/schemas/entities/User';
import { merge } from '@/utils/merge';
import { UserRole } from '@/types/index.types';

export function findAll(categoryFilter?: string): Promise<Ad[]> {
  // The 'categories' relation is not specified here since the { eager: true } option is set in the Ad entity to automatically fetch the related category when fetching an Ad.
  if (!categoryFilter) return Ad.find({ relations: ['tags'] });
  return Ad.find({
    where: {
      category: {
        name: Like(`%${categoryFilter.toLowerCase()}%`),
      },
    },
    relations: ['tags'],
  });
}

export function findOneBy(adId: number): Promise<Ad | null> {
  return Ad.findOne({
    where: { id: adId },
    relations: ['tags'],
  });
}

export function create(newAdContent: AddAdInput, user: User): Promise<Ad> {
  const newAd = new Ad();
  Object.assign(newAd, newAdContent, { createdBy: user });
  return newAd.save();
}

export async function patch(
  adId: number,
  updatedAdContent: UpdateAdInput,
  user: User,
): Promise<Ad | null> {
  // Only an admin or the user who created the ad can update it.
  const whereCreatedBy =
    user.role === UserRole.ADMIN ? {} : { createdBy: { id: user.id } };
  const ad = await Ad.findOne({
    where: { id: adId, ...whereCreatedBy },
    relations: ['tags'],
  });
  if (ad === null) return null;
  // Merge the updated data on the existing Ad entity and avoid unique constraint errors.
  const updatedAd = merge(ad, updatedAdContent as Record<string, unknown>);
  return updatedAd.save();
}

export async function remove(adId: number, user: User): Promise<Ad | null> {
  // Only an admin or the user who created the ad can delete it.
  const whereCreatedBy =
    user.role === UserRole.ADMIN ? {} : { createdBy: { id: user.id } };
  const ad = await Ad.findOneBy({
    id: adId,
    ...whereCreatedBy,
  });
  if (ad === null) return null;
  await ad.remove();
  return Object.assign(ad, { id: adId });
}
