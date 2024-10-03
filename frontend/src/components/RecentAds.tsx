import styled from "styled-components";
import { useAxios } from "@/hooks/useAxios";
import AdCard from "@components/AdCard";
import { AdNoTags } from "@tgc/common";
import { Loader } from "@/common/Loader";
import { sortAdsByCreationDate } from "@/utils/sort";

type RecentAdsProps = {
  handleAddPrice: (price: number) => void;
};

export default function RecentAds({ handleAddPrice }: RecentAdsProps) {
  const { data: ads, error, isLoading } = useAxios<AdNoTags[]>("ads");

  if (isLoading) {
    return (
      <Loader>
        <p>Loading ads...</p>
      </Loader>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!ads) {
    return <p>No ads currently available...</p>;
  }

  const sortedAds = sortAdsByCreationDate(ads);

  return (
    <AdList>
      {sortedAds.map((ad) => (
        <li key={ad.id}>
          <AdCard ad={ad} onAddPrice={handleAddPrice} />
        </li>
      ))}
    </AdList>
  );
}

const AdList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 40px;
`;
