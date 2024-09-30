import { NextFunction, Request, Response } from 'express';
import * as tagsModel from '@models/tags.model.ts';
import { isEmpty } from '@tgc/common';
import { Tag } from '@/database/entities/Tag.ts';
import { IdParam, AffectedRow, TagFilter } from '@/types/controller.type.ts';
import { TagContent } from '@/types/tags.types.ts';
import { NotFoundError } from '@/types/CustomError.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, TagFilter>,
  res: Response<Tag[]>,
): Promise<void> {
  const { name: searchFilter } = req.query ?? {};
  const tags = await tagsModel.findAll(searchFilter);
  res.json(tags);
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Tag[]>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const tags = await tagsModel.findOneBy(id);
  if (isEmpty(tags)) {
    next(new NotFoundError(`No existing tag with "id" ${id.toString()}.`));
    return;
  }
  res.json(tags);
}

export async function create(
  req: Request<unknown, unknown, TagContent>,
  res: Response<Tag>,
): Promise<void> {
  const content = req.body;
  const createdTag = await tagsModel.create(content);
  res.json(createdTag);
}

export async function remove(
  req: Request<IdParam>,
  res: Response<AffectedRow>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const result = await tagsModel.remove(id);
  if (result.affected === 0) {
    next(new NotFoundError(`No existing tag with "id" ${id.toString()}.`));
    return;
  }
  res.json({ id });
}

export async function patch(
  req: Request<IdParam, unknown, Partial<TagContent>>,
  res: Response<Tag>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const content = req.body;
  const updatedTag = await tagsModel.patch(id, content);
  if (isEmpty(updatedTag)) {
    next(new NotFoundError(`No existing tag with "id" ${id.toString()}.`));
    return;
  }
  res.json(updatedTag);
}

export async function edit(
  req: Request<IdParam, unknown, TagContent>,
  res: Response<Tag>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const content = req.body;
  const updatedTag = await tagsModel.put(id, content);
  if (isEmpty(updatedTag)) {
    next(new NotFoundError(`No existing tag with "id" ${id.toString()}.`));
    return;
  }
  res.json(updatedTag);
}
