import axios, { AxiosResponse } from "axios";
import { Ad, AdContent } from "@tgc/common";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function createAd(adContent: AdContent): Promise<AxiosResponse<Ad>> {
  return axios.post<Ad>(`${BASE_URL}/ads`, adContent, {});
}
