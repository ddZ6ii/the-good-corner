import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Ad as AdType, IdParam, IdParamSchema } from "@tgc/common";
import Loader from "@/common/Loader";
import {
  Ad,
  AdActions,
  AdContent,
  AdPrice,
  AdThumbnail,
  AdTitle,
} from "@/components/ad";
import { GET_AD } from "@/graphql";
import PageContent from "@/layouts/PageContent";
import { basePillStyle } from "@/themes/styles";
import { theme } from "@/themes/theme";
import { capitalize, formatPriceWithCurrency } from "@/utils/format";
import AdTags from "@/components/ad/AdTags";

export default function AdPage() {
  const params = useParams<IdParam>();
  const { id } = IdParamSchema.parse(params);
  const {
    data: { ad } = {},
    error,
    loading,
  } = useQuery<{ ad: AdType }>(GET_AD, {
    variables: { id },
    skip: !id,
  });

  if (loading) {
    return <Loader $center size="lg" />;
  }

  if (error || !ad) {
    console.error(error);
    return <p>No ad found!</p>;
  }

  return (
    <PageContent title={capitalize(ad.title)}>
      <Ad>
        <AdActions id={ad.id} />
        <AdThumbnail alt={ad.title} src={ad.picture} />
        <AdContent>
          <AdCategory>{ad.category.name}</AdCategory>
          <AdTitle title={ad.title}>{ad.title}</AdTitle>
          <AdPrice>{formatPriceWithCurrency(ad.price)}</AdPrice>
          <AdDescription>{ad.description}</AdDescription>
          <AdTags tags={ad.tags ?? []} />
        </AdContent>
      </Ad>
    </PageContent>
  );
}

const AdCategory = styled.p`
  ${basePillStyle}
`;

const AdDescription = styled.p`
  color: ${theme.color.neutral.light};
  font-size: 16px;
`;
