import { NextFunction, Request, Response } from 'express';
import * as adsModel from '@models/ads.model.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import { AdContentSchema, AdPartialContentSchema, isEmpty } from '@tgc/common';
import {
  IdParam,
  AffectedRow,
  FilterAdByCategory,
} from '@/types/controller.type.ts';
import {
  FilterAdByCategorySchema,
  IdSchema,
} from '@/types/controller.schemas.ts';
import { Ad } from '@/database/entities/Ad.ts';
import { AdContent } from '@/types/ads.types.ts';
import { BadRequestError, NotFoundError } from '@/types/CustomError.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, FilterAdByCategory>,
  res: Response<Ad[]>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = FilterAdByCategorySchema.safeParse(
    req.query,
  );
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedCategoryFilter = data?.category;
  const ads = await adsModel.findAll(parsedCategoryFilter);
  res.json(ads);
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Ad[]>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = IdSchema.safeParse(req.params);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedAdId = data.id;
  const ads = await adsModel.findOneBy(parsedAdId);
  if (isEmpty(ads)) {
    next(
      new NotFoundError(`No existing ad with "id" ${parsedAdId.toString()}.`),
    );
    return;
  }
  res.json(ads);
}

export async function create(
  req: Request<unknown, unknown, AdContent>,
  res: Response<Ad>,
  next: NextFunction,
): Promise<void> {
  const {
    success,
    data: parsedAdContent,
    error,
  } = AdContentSchema.safeParse(req.body);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const createdAd = await adsModel.create(parsedAdContent);
  res.json(createdAd);
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
  const parsedAdId = data.id;
  const result = await adsModel.remove(parsedAdId);
  if (result.affected === 0) {
    next(
      new NotFoundError(`No existing ad with "id" ${parsedAdId.toString()}.`),
    );
    return;
  }
  res.json({ id: parsedAdId });
}

export async function patch(
  req: Request<IdParam, unknown, Partial<AdContent>>,
  res: Response<Ad>,
  next: NextFunction,
): Promise<void> {
  const parsedParams = IdSchema.safeParse(req.params);
  if (!parsedParams.success) {
    const errorMessage = formatZodErrorMessage(parsedParams.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedBody = AdPartialContentSchema.safeParse(req.body);
  if (!parsedBody.success) {
    const errorMessage = formatZodErrorMessage(parsedBody.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedAdId = parsedParams.data.id;
  const parsedAdContent = parsedBody.data;
  const updatedAd = await adsModel.patch(parsedAdId, parsedAdContent);
  if (isEmpty(updatedAd)) {
    next(
      new NotFoundError(`No existing ad with "id" ${parsedAdId.toString()}.`),
    );
    return;
  }
  res.json(updatedAd);
}

export async function edit(
  req: Request<IdParam, unknown, AdContent>,
  res: Response<Ad>,
  next: NextFunction,
): Promise<void> {
  const parsedParams = IdSchema.safeParse(req.params);
  if (!parsedParams.success) {
    const errorMessage = formatZodErrorMessage(parsedParams.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedBody = AdContentSchema.safeParse(req.body);
  if (!parsedBody.success) {
    const errorMessage = formatZodErrorMessage(parsedBody.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedAdId = parsedParams.data.id;
  const parsedAdContent = parsedBody.data;
  const updatedAd = await adsModel.put(parsedAdId, parsedAdContent);
  if (isEmpty(updatedAd)) {
    next(
      new NotFoundError(`No existing ad with "id" ${parsedAdId.toString()}.`),
    );
    return;
  }
  res.json(updatedAd);
}
