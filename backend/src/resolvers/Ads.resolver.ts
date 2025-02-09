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
import { AuthContextType, UserRole } from '@/types/index.types';

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
  @Authorized(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Ad)
  async createAd(
    @Arg('data', () => AddAdInput) data: AddAdInput,
    @Ctx() context: AuthContextType,
  ): Promise<Ad> {
    const createdAd = await adsModel.create(data, context.user);
    return createdAd;
  }

  @Authorized(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateAdInput)
    data: UpdateAdInput,
    @Ctx() context: AuthContextType,
  ): Promise<Ad | null> {
    const updatedAd = await adsModel.patch(id, data, context.user);
    return updatedAd;
  }

  @Authorized(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Ad, { nullable: true })
  async deleteAd(
    @Arg('id', () => ID) id: number,
    @Ctx() context: AuthContextType,
  ): Promise<Ad | null> {
    const deletedAd = await adsModel.remove(id, context.user);
    return deletedAd;
  }
}
