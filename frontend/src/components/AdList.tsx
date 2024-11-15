import styled from "styled-components";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Ad as AdType } from "@tgc/common";
import { theme } from "@/themes/theme";
import { formatPriceWithCurrency } from "@utils/format";

type AdListProps = {
  ads: AdType[];
};

export default function AdList({ ads }: AdListProps) {
  return (
    <AdGallery>
      {ads.map((ad) => (
        <li key={ad.id}>
          <AdCard>
            <AdLink to={`ads/${ad.id.toString()}`}>
              <AdThumbnail alt={ad.title} src={ad.picture} />
              <AdContent>
                <AdTitle title={ad.title}>{ad.title}</AdTitle>
                <AdPrice>{formatPriceWithCurrency(ad.price)}</AdPrice>
              </AdContent>
            </AdLink>
          </AdCard>
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

const AdCard = styled.div`
  margin: 0 auto;
  width: min(300px, 100%);
  display: grid;
  align-items: center;
  background-color: ${theme.color.white};
  border-radius: ${theme.borderRadius.rounded_lg};
  box-shadow: ${theme.shadow.base};
  color: inherit;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;
  &:has(> a:is(:hover, :focus-visible)) {
    box-shadow: ${theme.shadow.md};
    outline: 1px solid ${theme.color.primary};
  }
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

const AdThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;

const AdContent = styled.div`
  margin-block: 8px;
  padding: 1rem;
  display: grid;
  font-size: 18px;
  text-align: left;
  gap: 16px;
`;

const AdTitle = styled.h3`
  font-weight: bold;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AdPrice = styled.p`
  font-size: 14px;
  font-weight: medium;
  color: ${theme.color.neutral.light};
  white-space: nowrap;
`;
