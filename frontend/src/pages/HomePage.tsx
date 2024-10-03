import { useState } from "react";
import styled from "styled-components";
import RecentAds from "@components/RecentAds";
import { formatPriceWithCurrency } from "@/utils/format";

export default function HomePage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const formattedPrice = formatPriceWithCurrency(totalPrice);

  const handleAddPrice = (price: number): void => {
    setTotalPrice(totalPrice + price);
  };

  return (
    <Section>
      <Container>
        <h2>Recent ads</h2>
        <p>Total price: {formattedPrice}</p>
      </Container>
      <RecentAds handleAddPrice={handleAddPrice} />
    </Section>
  );
}

const Container = styled.div`
  margin-bottom: 32px;
  & h2 {
    margin-bottom: 16px;
  }
`;

const Section = styled.section`
  display: grid;
  gap: 16px;
`;
