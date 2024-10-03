import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { AdNoTags } from "@tgc/common";
import Loader from "@/common/Loader";
import AdGallery from "@/layouts/AdGallery";
import MainContent from "@/layouts/MainContent";
import { formatPriceWithCurrency } from "@/utils/format";
import { sortAdsByCreationDate } from "@/utils/sort";

export default function HomePage() {
  const { data: ads, error, isLoading } = useAxios<AdNoTags[]>("ads");
  const [totalPrice, setTotalPrice] = useState(0);
  const formattedPrice = formatPriceWithCurrency(totalPrice);

  const handleAddPrice = (price: number): void => {
    setTotalPrice(totalPrice + price);
  };

  if (isLoading) {
    return (
      <MainContent title="Recent ads">
        <Loader />
      </MainContent>
    );
  }

  if (error || ads === null) {
    return (
      <MainContent title="Recent ads">
        <p>No ads currently available...</p>
      </MainContent>
    );
  }

  const sortedAds = sortAdsByCreationDate(ads);

  return (
    <MainContent title="Recent ads">
      <p>Total price: {formattedPrice}</p>
      <AdGallery
        ads={sortedAds}
        onClick={(_, ad) => {
          handleAddPrice(ad.price);
        }}
      />
    </MainContent>
  );
}
