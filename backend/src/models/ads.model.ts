import { GraphQLResolveInfo } from 'graphql';
import { Like } from 'typeorm';
import { AddAdInput, UpdateAdInput } from '@/schemas/ads.schemas';
import { Ad } from '@/schemas/entities/Ad';
import { User } from '@/schemas/entities/User';
import { UserRole } from '@/types/index.types';
import { makeRelations, merge } from '@/utils';

/**
 * When specifying the `eager: true` option in the Ad entity, the related category will be automatically fetched when fetching an ad, without having to explicitly set the option `relations: ['category']` when calling Ad.find(), Ad.findBy() or findOneBy().
 *
 * Here we use the `makeRelations` function to dynamically build the relations to fetch based on the GraphQL query info object (more efficient).
 */

export function findAll(
  info: GraphQLResolveInfo,
  categoryFilter?: string,
): Promise<Ad[]> {
  if (!categoryFilter) return Ad.find({ relations: makeRelations(info, Ad) });
  return Ad.find({
    where: {
      category: {
        name: Like(`%${categoryFilter.toLowerCase()}%`),
      },
    },
    relations: makeRelations(info, Ad),
  });
}

export function findOneBy(
  adId: number,
  info: GraphQLResolveInfo,
): Promise<Ad | null> {
  return Ad.findOne({
    where: { id: adId },
    relations: makeRelations(info, Ad),
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
  info: GraphQLResolveInfo,
): Promise<Ad | null> {
  // Only an admin or the user who created the ad can update it.
  const whereCreatedBy =
    user.role === UserRole.ADMIN ? {} : { createdBy: { id: user.id } };
  const ad = await Ad.findOne({
    where: { id: adId, ...whereCreatedBy },
    relations: makeRelations(info, Ad),
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
