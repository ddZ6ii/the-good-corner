import { Arg, Args, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Tag } from '@/entities/Tag';
import * as tagsModel from '@/models/tags.model.ts';
import {
  AddTagInput,
  GetTagArgs,
  GetTagsArgs,
  UpdateTagInput,
} from '@/types/tags.types';

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

  @Mutation(() => Tag)
  async createTag(
    @Arg('data', () => AddTagInput) data: AddTagInput,
  ): Promise<Tag> {
    const createdTag = await tagsModel.create(data);
    return createdTag;
  }

  @Mutation(() => Tag, { nullable: true })
  async updateTag(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateTagInput) data: UpdateTagInput,
  ): Promise<Tag | null> {
    const updatedTag = await tagsModel.patch(id, data);
    return updatedTag;
  }

  @Mutation(() => ID, { nullable: true })
  async deleteTag(@Arg('id', () => ID) id: number): Promise<number | null> {
    const result = await tagsModel.remove(id);
    if (result.affected === 0) {
      return null;
    }
    return id;
  }
}
