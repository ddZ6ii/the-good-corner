import { RequestHandler } from 'express';
import * as adModel from '@models/ad.model.ts';
import { Ad, AdContent, isEmpty } from '@tgc/common';
import { IdParam, AffectedRow, CustomError } from '@/types/controller.type.ts';

export const welcome: RequestHandler<unknown, unknown, unknown, unknown> = (
  _req,
  res,
) => {
  res.send('Hello World!');
};

export const get: RequestHandler<
  unknown,
  Ad[] | CustomError,
  unknown,
  unknown
> = async (_req, res) => {
  try {
    const ads = await adModel.find();
    return res.json(ads);
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong...',
    });
  }
};

export const create: RequestHandler<
  unknown,
  AffectedRow[] | CustomError,
  AdContent,
  unknown
> = async (req, res) => {
  try {
    const adContent = req.body;
    const insertedRows = await adModel.insert(adContent);
    return res.json(insertedRows);
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong...',
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
    const adId = parseInt(req.params.id, 10);
    const deletedRows = await adModel.remove(adId);
    if (isEmpty(deletedRows)) {
      return res.status(404).json({ code: 404, message: 'Ad not found.' });
    }
    return res.json(deletedRows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong...',
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
    const adId = parseInt(req.params.id, 10);
    const adContent = req.body;
    const updatedAds = await adModel.partialUpdate(adId, adContent);
    if (isEmpty(updatedAds)) {
      return res.status(404).json({ code: 404, message: 'Ad not found.' });
    }
    return res.json(updatedAds);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong...',
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
    const adId = parseInt(req.params.id, 10);
    const adContent = req.body;
    const updatedAds = await adModel.update(adId, adContent);
    if (isEmpty(updatedAds)) {
      return res.status(404).json({ code: 404, message: 'Ad not found.' });
    }
    return res.json(updatedAds);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong...',
    });
  }
};
