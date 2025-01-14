import { AdsQuery } from "@/gql/graphql";

export function sortAdsByCreationDate(ads: AdsQuery["ads"]): AdsQuery["ads"] {
  return [...ads].sort((ad1, ad2) => {
    return (ad2.createdAt as string).localeCompare(ad1.createdAt as string);
  });
}
