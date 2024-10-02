import { NextFunction, Request, Response } from 'express';
import * as adsModel from '@models/ads.model.ts';
import { IdParam, isEmpty } from '@tgc/common';
import { AffectedRow, FilterAd } from '@/types/controller.type.ts';
import { Ad } from '@/database/entities/Ad.ts';
import { AdContent } from '@/types/ads.types.ts';
import { NotFoundError } from '@/types/CustomError.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, FilterAd>,
  res: Response<Ad[]>,
): Promise<void> {
  const { category: searchFilter } = req.query ?? {};
  const ads = await adsModel.findAll(searchFilter);
  res.json(ads);
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Ad[]>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const ads = await adsModel.findOneBy(id);
  if (isEmpty(ads)) {
    next(new NotFoundError(`No existing ad with "id" ${id.toString()}.`));
    return;
  }
  res.json(ads);
}

export async function create(
  req: Request<unknown, unknown, AdContent>,
  res: Response<Ad>,
): Promise<void> {
  const content = req.body;
  const createdAd = await adsModel.create(content);
  res.json(createdAd);
}

export async function remove(
  req: Request<IdParam>,
  res: Response<AffectedRow>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const result = await adsModel.remove(id);
  if (result.affected === 0) {
    next(new NotFoundError(`No existing ad with "id" ${id.toString()}.`));
    return;
  }
  res.json({ id });
}

export async function patch(
  req: Request<IdParam, unknown, Partial<AdContent>>,
  res: Response<Ad>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const content = req.body;
  const updatedAd = await adsModel.patch(id, content);
  if (isEmpty(updatedAd)) {
    next(new NotFoundError(`No existing ad with "id" ${id.toString()}.`));
    return;
  }
  res.json(updatedAd);
}

export async function edit(
  req: Request<IdParam, unknown, AdContent>,
  res: Response<Ad>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const content = req.body;
  const updatedAd = await adsModel.put(id, content);
  if (isEmpty(updatedAd)) {
    next(new NotFoundError(`No existing ad with "id" ${id.toString()}.`));
    return;
  }
  res.json(updatedAd);
}
