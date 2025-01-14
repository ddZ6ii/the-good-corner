import styled from "styled-components";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Ad, AdContent, AdPrice, AdThumbnail, AdTitle } from "@/components/ad";
import { AdsQuery } from "@/gql/graphql";
import { theme } from "@/themes/theme";
import { formatPriceWithCurrency } from "@utils/format";

type AdListProps = {
  ads: AdsQuery["ads"];
};

export default function AdList({ ads }: AdListProps) {
  return (
    <AdGallery>
      {ads.map((ad) => (
        <li key={ad.id}>
          <Ad>
            <AdLink to={`/ads/${ad.id.toString()}`}>
              <AdThumbnail alt={ad.title} src={ad.picture} />
              <AdContent>
                <AdTitle title={ad.title}>{ad.title}</AdTitle>
                <AdPrice>{formatPriceWithCurrency(ad.price)}</AdPrice>
              </AdContent>
            </AdLink>
          </Ad>
        </li>
      ))}
    </AdGallery>
  );
}

const AdGallery = styled.ul`
  align-self: start;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
  gap: 40px;
`;

const AdLink = styled(NavLink)<NavLinkProps>`
  text-decoration: inherit;
  color: inherit;
  &:is(:hover, :focus-visible) {
    box-shadow: ${theme.shadow.md};
  }
  &:hover {
    & > img {
      transform: scale(1.05);
    }
  }
`;
