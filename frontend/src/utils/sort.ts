import { Ad } from "@tgc/common";

export function sortAdsByCreationDate(ads: Ad[]): Ad[] {
  return [...ads].sort((ad1, ad2) => {
    return ad1.createdAt < ad2.createdAt ? 1 : -1;
  });
}
