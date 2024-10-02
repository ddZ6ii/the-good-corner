import styled from "styled-components";
import { useAxios } from "@/hooks/useAxios";
import AdCard from "@components/AdCard";
import { AdNoTags } from "@tgc/common";
import { Loader } from "@/common/Loader";

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
    return <p>Data was null</p>;
  }

  return (
    <AdList>
      {ads.map((ad) => (
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
