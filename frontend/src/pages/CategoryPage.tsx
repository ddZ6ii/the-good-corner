import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loader from "@/common/Loader";
import AdList from "@/components/AdList";
import { GET_CATEGORY } from "@/graphql/category";
import { IdInput } from "@/gql/graphql";
import PageContent from "@/layouts/PageContent";
import { IdParamSchema } from "@/schemas";
import { capitalize } from "@/utils/format";
import { sortAdsByCreationDate } from "@/utils/sort";

export default function CategoryPage() {
  const params = useParams<IdInput>();
  const { id } = IdParamSchema.parse(params);
  const {
    data: { category } = {},
    error,
    loading,
  } = useQuery(GET_CATEGORY, {
    variables: { id },
    skip: !id,
  });
  const { name = "", ads = [] } = category ?? {};

  const sortedAds = useMemo(() => sortAdsByCreationDate(ads), [ads]);

  if (loading) {
    return <Loader $center size="lg" />;
  }

  if (error) {
    console.error(error);
    return <p>No ads currently available...</p>;
  }

  return (
    <PageContent title={capitalize(name)}>
      <AdList ads={sortedAds} />
    </PageContent>
  );
}
