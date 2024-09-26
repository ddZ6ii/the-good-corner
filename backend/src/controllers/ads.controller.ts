import { RequestHandler } from 'express';
import { ZodError } from 'zod';
import * as adsModel from '@models/ads.model.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import {
  Ad,
  AdContent,
  AdContentSchema,
  isEmpty,
  PartialAdContentSchema,
} from '@tgc/common';
import { IdParam, AffectedRow, CustomError } from '@/types/controller.type.ts';
import { IdSchema } from '@/types/controller.schemas.ts';

export const get: RequestHandler<
  unknown,
  Ad[] | CustomError,
  unknown,
  unknown
> = async (_req, res) => {
  try {
    const ads = await adsModel.find();
    return res.json(ads);
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to fetch ads.',
    });
  }
};

// ? Why using Zod parse does NOT generate a ZodError?
export const create: RequestHandler<
  unknown,
  AffectedRow[] | CustomError,
  AdContent,
  unknown
> = async (req, res) => {
  try {
    const { success, data, error } = AdContentSchema.safeParse(req.body);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedAdContent = data;
    const insertedRows = await adsModel.insert(parsedAdContent);
    return res.json(insertedRows);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to create ad.',
    });
  }
};

export const remove: RequestHandler<
  IdParam,
  AffectedRow[] | CustomError,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedAdId = data.id;
    const deletedRows = await adsModel.remove(parsedAdId);
    if (isEmpty(deletedRows)) {
      return res.status(404).json({ code: 404, message: 'Ad not found.' });
    }
    return res.json(deletedRows);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to delete ad.',
    });
  }
};

export const partialEdit: RequestHandler<
  IdParam,
  Ad[] | CustomError,
  Partial<AdContent>,
  unknown
> = async (req, res) => {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ZodError(parsedParams.error.issues);
    }
    const parsedBody = PartialAdContentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodError(parsedBody.error.issues);
    }
    const parsedAdId = parsedParams.data.id;
    const parsedAdContent = parsedBody.data;
    if (isEmpty(parsedAdContent)) {
      return res.status(400).json({ code: 400, message: 'No data to update.' });
    }
    const updatedAds = await adsModel.partialUpdate(
      parsedAdId,
      parsedAdContent,
    );
    if (isEmpty(updatedAds)) {
      return res.status(404).json({ code: 404, message: 'Ad not found.' });
    }
    return res.json(updatedAds);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to update ad.',
    });
  }
};

export const edit: RequestHandler<
  IdParam,
  Ad[] | CustomError,
  AdContent,
  unknown
> = async (req, res) => {
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
    const updatedAds = await adsModel.update(parsedAdId, parsedAdContent);
    if (isEmpty(updatedAds)) {
      return res.status(404).json({ code: 404, message: 'Ad not found.' });
    }
    return res.json(updatedAds);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to update ad.',
    });
  }
};
