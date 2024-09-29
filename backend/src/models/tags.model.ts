import { DeleteResult, Like } from 'typeorm';
import { Tag } from '@/database/entities/Tag.ts';
import { TagContent } from '@/types/tags.types.ts';

export function findAll(tagName: string | undefined): Promise<Tag[]> {
  if (!tagName) return Tag.find();
  return Tag.findBy({
    name: Like(`%${tagName.toLowerCase()}%`),
  });
}

export function findOneBy(tagId: number): Promise<Tag[]> {
  return Tag.findBy({ id: tagId });
}

export function create(content: TagContent): Promise<Tag> {
  const newTag = new Tag();
  Object.assign(newTag, content);
  return newTag.save();
}

export async function remove(tagId: number): Promise<DeleteResult> {
  return Tag.delete({ id: tagId });
}

// !TODO: should throw a NotFound custom error instead of returning undefined...
export async function patch(
  tagId: number,
  newContent: Partial<TagContent>,
): Promise<Tag | undefined> {
  const tag = await Tag.findOneBy({ id: tagId });
  if (tag === null) return;
  Object.assign(tag, newContent);
  return tag.save();
}

// !TODO: should throw a NotFound custom error instead of returning undefined...
export async function put(
  tagId: number,
  nextContent: TagContent,
): Promise<Tag | undefined> {
  const tag = await Tag.findOneBy({ id: tagId });
  if (tag === null) return;
  Object.assign(tag, nextContent);
  return tag.save();
}
