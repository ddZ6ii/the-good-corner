import { DeleteResult, Like } from 'typeorm';
import { Tag } from '@database/entities/Tag.ts';
import { TagContent } from '@/types/tags.types.ts';

export function findAll(tagName?: string): Promise<Tag[]> {
  // Add nested `ads.tags` relations to the query to also display all the other tags related to an ad for eacg tag.
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

export function create(newTagContent: TagContent): Promise<Tag> {
  const newTag = new Tag();
  Object.assign(newTag, newTagContent);
  return newTag.save();
}

export async function remove(tagId: number): Promise<DeleteResult> {
  return Tag.delete({ id: tagId });
}

export async function patch(
  tagId: number,
  updatedTagContent: Partial<TagContent>,
): Promise<Tag | null> {
  const tag = await Tag.findOneBy({ id: tagId });
  if (tag === null) return null;
  Object.assign(tag, updatedTagContent);
  return tag.save();
}
