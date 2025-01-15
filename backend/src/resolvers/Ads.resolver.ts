import {
  Arg,
  Args,
  Authorized,
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

@Resolver()
export class AdsResolver {
  // Make this query private to allow only authenticated users to access it (all non @Authorized queries are public).
  @Authorized()
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

  @Mutation(() => Ad)
  async createAd(@Arg('data', () => AddAdInput) data: AddAdInput): Promise<Ad> {
    const createdAd = await adsModel.create(data);
    return createdAd;
  }

  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateAdInput)
    data: UpdateAdInput,
  ): Promise<Ad | null> {
    const updatedAd = await adsModel.patch(id, data);
    return updatedAd;
  }

  @Mutation(() => ID, { nullable: true })
  async deleteAd(@Arg('id', () => ID) id: number): Promise<number | null> {
    const result = await adsModel.remove(id);
    if (result.affected === 0) {
      return null;
    }
    return id;
  }
}
