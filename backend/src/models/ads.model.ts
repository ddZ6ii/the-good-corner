import { DeleteResult, Like } from 'typeorm';
import { AddAdInput, UpdateAdInput } from '@/schemas/ads.schemas';
import { Ad } from '@/schemas/entities/Ad';
import { User } from '@/schemas/entities/User';
import { Nullable } from '@/types/index.types';
import { merge } from '@/utils/merge';

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

export function create(
  newAdContent: AddAdInput,
  author: Nullable<User>,
): Promise<Ad> {
  const newAd = new Ad();
  Object.assign(newAd, newAdContent, { createdBy: author });
  return newAd.save();
}

export async function remove(
  adId: number,
  author: Nullable<User>,
): Promise<DeleteResult> {
  return Ad.delete({ id: adId, createdBy: { id: author?.id } });
}

export async function patch(
  adId: number,
  updatedAdContent: UpdateAdInput,
  author: Nullable<User>,
): Promise<Ad | null> {
  const ad = await Ad.findOne({
    where: { id: adId, createdBy: { id: author?.id } },
    relations: ['tags'],
  });
  if (ad === null) return null;
  // Merge the updated data on the existing Ad entity and avoid unique constraint errors.
  const updatedAd = merge(ad, updatedAdContent as Record<string, unknown>);
  return updatedAd.save();
}
