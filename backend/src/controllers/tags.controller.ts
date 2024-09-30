import { Request, Response } from 'express';
import { ZodError } from 'zod';
import chalk from 'chalk';
import * as tagsModel from '@models/tags.model.ts';
import {
  isEmpty,
  TagContentSchema,
  TagPartialContentSchema,
} from '@tgc/common';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import { Tag } from '@/database/entities/Tag.ts';
import { IdSchema, TagFilterSchema } from '@/types/controller.schemas.ts';
import {
  IdParam,
  AffectedRow,
  CustomError,
  TagFilter,
} from '@/types/controller.type.ts';
import { TagContent } from '@/types/tags.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, TagFilter>,
  res: Response<Tag[] | CustomError>,
): Promise<void> {
  try {
    const { success, data, error } = TagFilterSchema.safeParse(req.query);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedTagFilter = data?.name;
    const tags = await tagsModel.findAll(parsedTagFilter);
    res.json(tags);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to fetch tags.',
      });
    }
  }
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Tag[] | CustomError>,
): Promise<void> {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedTagId = data.id;
    const tags = await tagsModel.findOneBy(parsedTagId);
    if (isEmpty(tags)) {
      res.status(404).json({ code: 404, message: 'Tag not found.' });
    } else {
      res.json(tags);
    }
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to fetch tag.',
      });
    }
  }
}

export async function create(
  req: Request<unknown, unknown, TagContent>,
  res: Response<Tag | CustomError>,
): Promise<void> {
  try {
    const {
      success,
      data: parsedTagContent,
      error,
    } = TagContentSchema.safeParse(req.body);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const createdTag = await tagsModel.create(parsedTagContent);
    res.json(createdTag);
  } catch (err: unknown) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to create tag.',
      });
    }
  }
}

export async function remove(
  req: Request<IdParam>,
  res: Response<AffectedRow | CustomError>,
): Promise<void> {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedTagId = data.id;
    const result = await tagsModel.remove(parsedTagId);
    if (result.affected === 0) {
      res.status(404).json({ code: 404, message: 'Tag not found.' });
    } else {
      res.json({ id: parsedTagId });
    }
  } catch (err) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to delete tag.',
      });
    }
  }
}

export async function patch(
  req: Request<IdParam, unknown, Partial<TagContent>>,
  res: Response<Tag | CustomError>,
): Promise<void> {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ZodError(parsedParams.error.issues);
    }
    const parsedBody = TagPartialContentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodError(parsedBody.error.issues);
    }
    const parsedTagId = parsedParams.data.id;
    const parsedTagContent = parsedBody.data;
    const updatedTag = await tagsModel.patch(parsedTagId, parsedTagContent);
    if (isEmpty(updatedTag)) {
      res.status(404).json({ code: 404, message: 'Tag not found.' });
    } else {
      res.json(updatedTag);
    }
  } catch (err) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to update tag.',
      });
    }
  }
}

export async function edit(
  req: Request<IdParam, unknown, TagContent>,
  res: Response<Tag | CustomError>,
): Promise<void> {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ZodError(parsedParams.error.issues);
    }
    const parsedBody = TagContentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodError(parsedBody.error.issues);
    }
    const parsedTagId = parsedParams.data.id;
    const parsedTagContent = parsedBody.data;
    const updatedTag = await tagsModel.put(parsedTagId, parsedTagContent);
    if (isEmpty(updatedTag)) {
      res.status(404).json({ code: 404, message: 'Tag not found.' });
    } else {
      res.json(updatedTag);
    }
  } catch (err) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to update tag.',
      });
    }
  }
}
