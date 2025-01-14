import { DeleteResult, Like } from 'typeorm';
import { Tag } from '@/entities/Tag';
import { AddTagInput, UpdateTagInput } from '@/types/tags.types';

export function findAll(tagName?: string): Promise<Tag[]> {
  // Add nested `ads.tags` relations to the query to also display all the other tags related to an ad for each tag.
  if (!tagName) return Tag.find({ relations: ['ads', 'ads.tags'] });
  return Tag.find({
    where: {
      name: Like(`%${tagName.toLowerCase()}%`),
    },
    relations: ['ads', 'ads.tags'],
  });
}

export function findOneBy(tagId: number): Promise<Tag | null> {
  return Tag.findOne({
    where: { id: tagId },
    relations: ['ads', 'ads.tags'],
  });
}

export function create(newTagContent: AddTagInput): Promise<Tag> {
  const newTag = new Tag();
  Object.assign(newTag, newTagContent);
  return newTag.save();
}

export async function remove(tagId: number): Promise<DeleteResult> {
  return Tag.delete({ id: tagId });
}

export async function patch(
  tagId: number,
  updatedTagContent: UpdateTagInput,
): Promise<Tag | null> {
  const tag = await Tag.findOneBy({ id: tagId });
  if (tag === null) return null;
  Object.assign(tag, updatedTagContent);
  return tag.save();
}
