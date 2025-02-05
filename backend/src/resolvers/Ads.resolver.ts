import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import * as adsModel from '@/models/ads.model';
import {
  AddAdInput,
  GetAdArgs,
  GetAdsArgs,
  UpdateAdInput,
} from '@/schemas/ads.schemas';
import { Ad } from '@/schemas/entities/Ad';
import { ContextType } from '@/types/index.types';

@Resolver()
export class AdsResolver {
  /** Public queries */
  @Query(() => [Ad])
  async ads(
    // Allow to pass optional categoryName parameter to filter ads by category's name.
    @Args(() => GetAdsArgs) { categoryName }: GetAdsArgs,
  ): Promise<Ad[]> {
    const ads = await adsModel.findAll(categoryName);
    return ads;
  }

  // Set nullable to true to allow returning null if no ad is found, and avoid throwing an error.
  @Query(() => Ad, { nullable: true })
  async ad(@Args(() => GetAdArgs) { id }: GetAdArgs): Promise<Ad | null> {
    const ad = await adsModel.findOneBy(id);
    return ad;
  }

  /** Private queries */
  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg('data', () => AddAdInput) data: AddAdInput,
    @Ctx() context: ContextType,
  ): Promise<Ad> {
    const createdAd = await adsModel.create(data, context.user);
    return createdAd;
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateAdInput)
    data: UpdateAdInput,
    @Ctx() context: ContextType,
  ): Promise<Ad | null> {
    const updatedAd = await adsModel.patch(id, data, context.user);
    return updatedAd;
  }

  @Authorized()
  @Mutation(() => ID, { nullable: true })
  async deleteAd(
    @Arg('id', () => ID) id: number,
    @Ctx() context: ContextType,
  ): Promise<number | null> {
    const result = await adsModel.remove(id, context.user);
    if (result.affected === 0) {
      return null;
    }
    return id;
  }
}
