import { RequestHandler } from 'express';
import { Ad, AdContent, IdParam } from '@/types/types.ts';
import ADS from '../data/ads.json';

const ads: Ad[] = structuredClone(ADS);
let nextId = ads.length + 1;

export const welcome: RequestHandler<unknown, unknown, unknown, unknown> = (
  _req,
  res,
) => {
  res.send('Hello World!');
};

export const getAllAds: RequestHandler<unknown, Ad[], unknown, unknown> = (
  _req,
  res,
) => {
  res.json(ads);
};

export const createAd: RequestHandler<unknown, Ad, AdContent, unknown> = (
  req,
  res,
) => {
  const adContent = req.body;
  const newAdd: Ad = {
    id: nextId++,
    ...adContent,
    createdAt: new Date().toISOString(),
  };
  ads.push(newAdd);
  res.json(newAdd);
};

export const deleteAdById: RequestHandler<
  IdParam,
  unknown,
  unknown,
  unknown
> = (req, res) => {
  const adId = parseInt(req.params.id, 10);
  const match = ads.findIndex((ad) => ad.id === adId);
  const notFound = match === -1;
  if (notFound) return res.status(404).send('Ad not found.');
  ads.splice(match, 1);
  return res.sendStatus(200);
};

export const updateAdById: RequestHandler<
  IdParam,
  Ad | string,
  Partial<AdContent>,
  unknown
> = (req, res) => {
  const adId = parseInt(req.params.id, 10);
  const adContent = req.body;
  const match = ads.findIndex((ad) => ad.id === adId);
  const notFound = match === -1;
  if (notFound) return res.status(404).send('Ad not found.');
  const updatedAd: Ad = {
    ...ads[match],
    ...adContent,
    id: ads[match].id,
  };
  ads[match] = updatedAd;
  return res.json(updatedAd);
};
