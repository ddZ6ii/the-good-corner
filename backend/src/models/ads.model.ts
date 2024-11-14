import { DeleteResult, Like } from 'typeorm';
import { Ad } from '@database/entities/Ad.ts';
import { merge } from '@utils/merge';
import { AdContent } from '@/types/ads.types.ts';

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

export function create(newAdContent: AdContent): Promise<Ad> {
  const newAd = new Ad();
  Object.assign(newAd, newAdContent);
  return newAd.save();
}

export async function remove(adId: number): Promise<DeleteResult> {
  return Ad.delete({ id: adId });
}

export async function patch(
  adId: number,
  updatedAdContent: Partial<AdContent>,
): Promise<Ad | null> {
  const ad = await Ad.findOne({
    where: { id: adId },
    relations: ['tags'],
  });
  if (ad === null) return null;
  // Merge the updated data on the existing Ad entity and avoid unique constraint errors.
  const updatedAd = merge(ad, updatedAdContent);
  return updatedAd.save();
}
