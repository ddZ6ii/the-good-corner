import { Ad } from "@/gql/graphql";

export function sortAdsByCreationDate<T extends Partial<Ad>>(ads: T[]): T[] {
  return [...ads].sort((ad1, ad2) => {
    return (ad2.createdAt as string).localeCompare(ad1.createdAt as string);
  });
}
