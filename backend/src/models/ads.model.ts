import { DeleteResult, Like } from 'typeorm';
import { Ad } from '@database/entities/Ad.ts';
import { AdContent } from '@/types/ads.types.ts';
import { isEmpty } from '@tgc/common';

export function findAll(categoryFilter: string | undefined): Promise<Ad[]> {
  if (!categoryFilter) return Ad.find();
  return Ad.findBy({
    category: {
      name: Like(`%${categoryFilter.toLowerCase()}%`),
    },
  });
}

export function findOneBy(adId: number): Promise<Ad | null> {
  return Ad.findOne({
    where: { id: adId },
    relations: ['tags'],
  });
}

export function create(content: AdContent): Promise<Ad> {
  const newAd = new Ad();
  Object.assign(newAd, content);
  return newAd.save();
}

export async function remove(adId: number): Promise<DeleteResult> {
  return Ad.delete({ id: adId });
}

export async function patch(
  adId: number,
  newContent: Partial<AdContent>,
): Promise<Ad | undefined> {
  const ad = await Ad.findOneBy({ id: adId });
  if (ad === null) return;
  Object.assign(ad, newContent);
  return ad.save();
}

export async function put(
  adId: number,
  nextContent: AdContent,
): Promise<Ad | undefined> {
  const ad = await Ad.findOneBy({ id: adId });
  if (ad === null) return;
  Object.assign(ad, nextContent, {
    tags: isEmpty(nextContent.tags) ? [] : nextContent.tags,
  });
  return ad.save();
}
