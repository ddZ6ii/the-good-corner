import { Like } from 'typeorm';
import { AddTagInput, UpdateTagInput } from '@/schemas/tags.schemas';
import { Tag } from '@/schemas/entities/Tag';
import { User } from '@/schemas/entities/User';

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

export function create(newTagContent: AddTagInput, user: User): Promise<Tag> {
  const newTag = new Tag();
  Object.assign(newTag, newTagContent, { createdBy: user });
  return newTag.save();
}

export async function patch(
  tagId: number,
  updatedTagContent: UpdateTagInput,
  user: User,
): Promise<Tag | null> {
  const tag = await Tag.findOneBy({ id: tagId, createdBy: { id: user.id } });
  if (tag === null) return null;
  Object.assign(tag, updatedTagContent);
  return tag.save();
}

export async function remove(tagId: number, user: User): Promise<Tag | null> {
  const tag = await Tag.findOneBy({
    id: tagId,
    createdBy: { id: user.id },
  });
  if (tag === null) return null;
  await tag.remove();
  return Object.assign(tag, { id: tagId });
}
