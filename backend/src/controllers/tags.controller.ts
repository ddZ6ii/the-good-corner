import { NextFunction, Request, Response } from 'express';
import * as tagsModel from '@models/tags.model.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import {
  isEmpty,
  TagContentSchema,
  TagPartialContentSchema,
} from '@tgc/common';
import { Tag } from '@/database/entities/Tag.ts';
import { IdSchema, TagFilterSchema } from '@/types/controller.schemas.ts';
import { IdParam, AffectedRow, TagFilter } from '@/types/controller.type.ts';
import { TagContent } from '@/types/tags.types.ts';
import { BadRequestError, NotFoundError } from '@/types/CustomError.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, TagFilter>,
  res: Response<Tag[]>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = TagFilterSchema.safeParse(req.query);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedTagFilter = data?.name;
  const tags = await tagsModel.findAll(parsedTagFilter);
  res.json(tags);
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Tag[]>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = IdSchema.safeParse(req.params);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedTagId = data.id;
  const tags = await tagsModel.findOneBy(parsedTagId);
  if (isEmpty(tags)) {
    next(
      new NotFoundError(`No existing tag with "id" ${parsedTagId.toString()}.`),
    );
    return;
  }
  res.json(tags);
}

export async function create(
  req: Request<unknown, unknown, TagContent>,
  res: Response<Tag>,
  next: NextFunction,
): Promise<void> {
  const {
    success,
    data: parsedTagContent,
    error,
  } = TagContentSchema.safeParse(req.body);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const createdTag = await tagsModel.create(parsedTagContent);
  res.json(createdTag);
}

export async function remove(
  req: Request<IdParam>,
  res: Response<AffectedRow>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = IdSchema.safeParse(req.params);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedTagId = data.id;
  const result = await tagsModel.remove(parsedTagId);
  if (result.affected === 0) {
    next(
      new NotFoundError(`No existing tag with "id" ${parsedTagId.toString()}.`),
    );
    return;
  }
  res.json({ id: parsedTagId });
}

export async function patch(
  req: Request<IdParam, unknown, Partial<TagContent>>,
  res: Response<Tag>,
  next: NextFunction,
): Promise<void> {
  const parsedParams = IdSchema.safeParse(req.params);
  if (!parsedParams.success) {
    const errorMessage = formatZodErrorMessage(parsedParams.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedBody = TagPartialContentSchema.safeParse(req.body);
  if (!parsedBody.success) {
    const errorMessage = formatZodErrorMessage(parsedBody.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedTagId = parsedParams.data.id;
  const parsedTagContent = parsedBody.data;
  const updatedTag = await tagsModel.patch(parsedTagId, parsedTagContent);
  if (isEmpty(updatedTag)) {
    next(
      new NotFoundError(`No existing tag with "id" ${parsedTagId.toString()}.`),
    );
    return;
  }
  res.json(updatedTag);
}

export async function edit(
  req: Request<IdParam, unknown, TagContent>,
  res: Response<Tag>,
  next: NextFunction,
): Promise<void> {
  const parsedParams = IdSchema.safeParse(req.params);
  if (!parsedParams.success) {
    const errorMessage = formatZodErrorMessage(parsedParams.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedBody = TagContentSchema.safeParse(req.body);
  if (!parsedBody.success) {
    const errorMessage = formatZodErrorMessage(parsedBody.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedTagId = parsedParams.data.id;
  const parsedTagContent = parsedBody.data;
  const updatedTag = await tagsModel.put(parsedTagId, parsedTagContent);
  if (isEmpty(updatedTag)) {
    next(
      new NotFoundError(`No existing tag with "id" ${parsedTagId.toString()}.`),
    );
    return;
  }
  res.json(updatedTag);
}
