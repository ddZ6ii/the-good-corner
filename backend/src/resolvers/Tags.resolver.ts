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
import * as tagsModel from '@/models/tags.model.ts';
import {
  AddTagInput,
  GetTagArgs,
  GetTagsArgs,
  UpdateTagInput,
} from '@/schemas/tags.schemas';
import { Tag } from '@/schemas/entities/Tag';
import { AuthContextType, UserRole } from '@/types/index.types';

@Resolver()
export class TagsResolver {
  @Query(() => [Tag])
  async tags(
    // Allow to pass optional name parameter to filter tags by name.
    @Args(() => GetTagsArgs) { name }: GetTagsArgs,
  ): Promise<Tag[]> {
    const tags = await tagsModel.findAll(name);
    return tags;
  }

  // Set nullable to true to allow returning null if no tag is found, and avoid throwing an error.
  @Query(() => Tag, { nullable: true })
  async tag(@Args(() => GetTagArgs) { id }: GetTagArgs): Promise<Tag | null> {
    const tag = await tagsModel.findOneBy(id);
    return tag;
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Tag)
  async createTag(
    @Arg('data', () => AddTagInput) data: AddTagInput,
    @Ctx() context: AuthContextType,
  ): Promise<Tag> {
    const createdTag = await tagsModel.create(data, context.user);
    return createdTag;
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Tag, { nullable: true })
  async updateTag(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateTagInput) data: UpdateTagInput,
    @Ctx() context: AuthContextType,
  ): Promise<Tag | null> {
    const updatedTag = await tagsModel.patch(id, data, context.user);
    return updatedTag;
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Tag, { nullable: true })
  async deleteTag(
    @Arg('id', () => ID) id: number,
    @Ctx() context: AuthContextType,
  ): Promise<Tag | null> {
    const deletedTag = await tagsModel.remove(id, context.user);
    return deletedTag;
  }
}
