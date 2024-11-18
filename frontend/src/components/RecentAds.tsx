import { useMemo } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { Ad as AdType } from "@tgc/common";
import { GET_ADS } from "@/graphql";
import AdList from "@/components/AdList";
import { sortAdsByCreationDate } from "@/utils/sort";

export default function RecentAds() {
  const { data: { ads = [] } = {}, error } = useSuspenseQuery<{
    ads: AdType[];
  }>(GET_ADS);
  const sortedAds = useMemo(() => sortAdsByCreationDate(ads), [ads]);

  if (error) {
    console.error(error);
    return <p>No ads currently available...</p>;
  }

  return <AdList ads={sortedAds} />;
}
