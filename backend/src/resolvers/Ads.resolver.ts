import { GraphQLResolveInfo } from 'graphql'
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Info,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { adsModel } from '@/models'
import { AddAdInput, GetAdArgs, GetAdsArgs, UpdateAdInput } from '@/schemas'
import { Ad } from '@/schemas/entities'
import { AuthContextType, UserRole } from '@/types'

@Resolver()
export class AdsResolver {
  // Public queries
  @Query(() => [Ad])
  async ads(
    // Allow to pass optional categoryName parameter to filter ads by category's name.
    @Args(() => GetAdsArgs) { categoryName }: GetAdsArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Ad[]> {
    const ads = await adsModel.findAll(info, categoryName)
    return ads
  }

  // Set nullable to true to allow returning null if no ad is found, and avoid throwing an error.
  @Query(() => Ad, { nullable: true })
  async ad(
    @Args(() => GetAdArgs) { id }: GetAdArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Ad | null> {
    const ad = await adsModel.findOneBy(id, info)
    return ad
  }

  // Private queries //
  @Authorized(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Ad)
  async createAd(
    @Arg('data', () => AddAdInput) data: AddAdInput,
    @Ctx() context: AuthContextType,
  ): Promise<Ad> {
    const createdAd = await adsModel.create(data, context.user)
    return createdAd
  }

  @Authorized(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateAdInput)
    data: UpdateAdInput,
    @Ctx() context: AuthContextType,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Ad | null> {
    const updatedAd = await adsModel.patch(id, data, context.user, info)
    return updatedAd
  }

  @Authorized(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Ad, { nullable: true })
  async deleteAd(
    @Arg('id', () => ID) id: number,
    @Ctx() context: AuthContextType,
  ): Promise<Ad | null> {
    const deletedAd = await adsModel.remove(id, context.user)
    return deletedAd
  }
}
