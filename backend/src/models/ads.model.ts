import { DeleteResult } from 'typeorm';
import { Ad } from '@database/entities/Ad.ts';
import { AdContent } from '@/types/ads.types.ts';

export function findAll(): Promise<Ad[]> {
  return Ad.find();
}

export function findOneBy(adId: number): Promise<Ad[]> {
  return Ad.findBy({ id: adId });
}

export function create(content: AdContent): Promise<Ad> {
  const newAd = new Ad();
  Object.assign(newAd, content);
  return newAd.save();
}

export async function remove(adId: number): Promise<DeleteResult> {
  return Ad.delete({ id: adId });
}

// !TODO: should throw a NotFound custom error instead of returning undefined...
export async function patch(
  adId: number,
  newContent: Partial<AdContent>,
): Promise<Ad | undefined> {
  const ad = await Ad.findOneBy({ id: adId });
  if (ad === null) return;
  Object.assign(ad, newContent);
  return ad.save();
}

// !TODO: should throw a NotFound custom error instead of returning undefined...
export async function put(
  adId: number,
  nextContent: AdContent,
): Promise<Ad | undefined> {
  const ad = await Ad.findOneBy({ id: adId });
  if (ad === null) return;
  Object.assign(ad, nextContent);
  return ad.save();
}
