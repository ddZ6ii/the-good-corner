import { useMemo } from "react";
import { useQuery, useSuspenseQuery } from "@apollo/client";
// import { GET_ADS } from "@/graphql";
import AdList from "@/components/AdList";
import { sortAdsByCreationDate } from "@/utils/sort";
import { graphql } from "@/gql";

const GET_ADS = graphql(/* GraphQL */ `
  query ads {
    ads {
      id
      title
      picture
      price
      createdAt
    }
  }
`);

export default function RecentAds() {
  // const { data: { ads = [] } = {}, error } = useSuspenseQuery(GET_ADS);
  const { data, error } = useQuery(GET_ADS);

  const sortedAds = useMemo(() => sortAdsByCreationDate(ads), [ads]);

  if (error) {
    console.error(error);
    return <p>No ads currently available...</p>;
  }

  return <AdList ads={sortedAds} />;
}
