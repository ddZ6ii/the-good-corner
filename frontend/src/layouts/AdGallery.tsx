import styled from "styled-components";
import AdCard from "@components/AdCard";
import { AdNoTags } from "@tgc/common";
import { Button } from "@/common/Button";
import React from "react";

type AdGalleryProps = {
  ads: AdNoTags[];
  onClick?: (e: React.MouseEvent<HTMLElement>, ad: AdNoTags) => void;
};

export default function AdGallery({ ads, onClick }: AdGalleryProps) {
  return (
    <AdList>
      {ads.map((ad) => (
        <li key={ad.id}>
          <AdCard ad={ad}>
            {onClick && (
              <Button
                className="card__cta"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(e, ad);
                }}
              >
                Add price to total
              </Button>
            )}
          </AdCard>
        </li>
      ))}
    </AdList>
  );
}

const AdList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
  gap: 40px;
`;
