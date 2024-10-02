import styled from "styled-components";
import { useAxios } from "@/hooks/useAxios";
import AdCard from "@components/AdCard";
import { Ad } from "@/types/types";
import { Loader } from "@/common/Loader";
import { AxiosRequestConfig } from "axios";

type RecentAdsProps = {
  handleAddPrice: (price: number) => void;
};

const FETCH_OPTIONS: AxiosRequestConfig = {
  method: "GET",
};

export default function RecentAds({ handleAddPrice }: RecentAdsProps) {
  const { data: ads, error, isLoading } = useAxios<Ad[]>("ads", FETCH_OPTIONS);

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
