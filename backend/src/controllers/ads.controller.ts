import { Request, Response } from 'express';
import { ZodError } from 'zod';
import chalk from 'chalk';
import * as adsModel from '@models/ads.model.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import { AdContentSchema, AdPartialContentSchema, isEmpty } from '@tgc/common';
import {
  IdParam,
  AffectedRow,
  CustomError,
  FilterAdByCategory,
} from '@/types/controller.type.ts';
import {
  FilterAdByCategorySchema,
  IdSchema,
} from '@/types/controller.schemas.ts';
import { Ad } from '@/database/entities/Ad.ts';
import { AdContent } from '@/types/ads.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, FilterAdByCategory>,
  res: Response<Ad[] | CustomError>,
): Promise<void> {
  try {
    const { success, data, error } = FilterAdByCategorySchema.safeParse(
      req.query,
    );
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedCategoryFilter = data?.category;
    const ads = await adsModel.findAll(parsedCategoryFilter);
    res.json(ads);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to fetch ads.',
      });
    }
  }
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Ad[] | CustomError>,
): Promise<void> {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedAdId = data.id;
    const ads = await adsModel.findOneBy(parsedAdId);
    if (isEmpty(ads)) {
      res.status(404).json({ code: 404, message: 'Ad not found.' });
    } else {
      res.json(ads);
    }
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to fetch ad.',
      });
    }
  }
}

export async function create(
  req: Request<unknown, unknown, AdContent>,
  res: Response<Ad | CustomError>,
): Promise<void> {
  try {
    const {
      success,
      data: parsedAdContent,
      error,
    } = AdContentSchema.safeParse(req.body);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const createdAd = await adsModel.create(parsedAdContent);
    res.json(createdAd);
  } catch (err: unknown) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to create ad.',
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
    const parsedAdId = data.id;
    const result = await adsModel.remove(parsedAdId);
    if (result.affected === 0) {
      res.status(404).json({ code: 404, message: 'Ad not found.' });
    } else {
      res.json({ id: parsedAdId });
    }
  } catch (err) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to delete ad.',
      });
    }
  }
}

export async function patch(
  req: Request<IdParam, unknown, Partial<AdContent>>,
  res: Response<Ad | CustomError>,
): Promise<void> {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ZodError(parsedParams.error.issues);
    }
    const parsedBody = AdPartialContentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodError(parsedBody.error.issues);
    }
    const parsedAdId = parsedParams.data.id;
    const parsedAdContent = parsedBody.data;
    const updatedAd = await adsModel.patch(parsedAdId, parsedAdContent);
    if (isEmpty(updatedAd)) {
      res.status(404).json({ code: 404, message: 'Ad not found.' });
    } else {
      res.json(updatedAd);
    }
  } catch (err) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to update ad.',
      });
    }
  }
}

export async function edit(
  req: Request<IdParam, unknown, AdContent>,
  res: Response<Ad | CustomError>,
): Promise<void> {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ZodError(parsedParams.error.issues);
    }
    const parsedBody = AdContentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodError(parsedBody.error.issues);
    }
    const parsedAdId = parsedParams.data.id;
    const parsedAdContent = parsedBody.data;
    const updatedAd = await adsModel.put(parsedAdId, parsedAdContent);
    if (isEmpty(updatedAd)) {
      res.status(404).json({ code: 404, message: 'Ad not found.' });
    } else {
      res.json(updatedAd);
    }
  } catch (err) {
    console.error(chalk.red(err));
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to update ad.',
      });
    }
  }
}
