import { useState } from "react";
import styled from "styled-components";
import AdCard from "@components/AdCard";
import { Ad } from "@/types/types";
import { formatPrice } from "@/utils/format";

export default function RecentAds() {
  const [totalPrice, setTotalPrice] = useState(0);
  const formattedPrice = formatPrice(totalPrice);

  const handleAddPrice = (price: number): void => {
    setTotalPrice(totalPrice + price);
  };

  return (
    <section>
      <Heading>Recent ads</Heading>
      <p>Total price: {formattedPrice}</p>
      <AdList>
        {ADS.map((ad) => (
          <li key={ad.id}>
            <AdCard ad={ad} onAddPrice={handleAddPrice} />
          </li>
        ))}
      </AdList>
    </section>
  );
}

const Heading = styled.h2`
  margin-bottom: 40px;
`;

const AdList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const ADS: Ad[] = [
  {
    id: 1,
    title: "Table",
    src: "/assets/images/table.webp",
    alt: "Table",
    price: 12000,
  },
  {
    id: 2,
    title: "Carboy",
    src: "/assets/images/carboy.webp",
    alt: "Carboy",
    price: 7500,
  },
  {
    id: 3,
    title: "Trinket tray",
    src: "/assets/images/trinket-tray.webp",
    alt: "Trinket tray",
    price: 400,
  },
  {
    id: 4,
    title: "Dresser",
    src: "/assets/images/dresser.webp",
    alt: "Dresser",
    price: 90000,
  },
  {
    id: 5,
    title: "Candle",
    src: "/assets/images/candle.webp",
    alt: "Candle",
    price: 800,
  },
  {
    id: 6,
    title: "Magazine rack",
    src: "/assets/images/magazine-rack.webp",
    alt: "Magazine rack",
    price: 4500,
  },
];
