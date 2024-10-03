import { AdNoTags } from "@tgc/common";

export function sortAdsByCreationDate(ads: AdNoTags[]): AdNoTags[] {
  return [...ads].sort((ad1, ad2) => {
    return ad1.createdAt < ad2.createdAt ? 1 : -1;
  });
}
