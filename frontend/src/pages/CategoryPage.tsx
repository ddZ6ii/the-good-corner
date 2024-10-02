import { useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosRequestConfig } from "axios";
import styled from "styled-components";
import { useAxios } from "@/hooks/useAxios";
import { capitalize, formatUrl } from "@/utils/format";
import { CategoryWithAds, IdParam, IdParamSchema } from "@tgc/common";
import { Loader } from "@/common/Loader";
import AdCard from "@/components/AdCard";

const FETCH_OPTIONS: AxiosRequestConfig = {
  method: "GET",
};

export default function CategoryPage() {
  const params = useParams<IdParam>();
  const { id: parsedCateggoryId } = IdParamSchema.parse(params);
  const formattedUrl = formatUrl("categories", parseInt(parsedCateggoryId, 10));

  const {
    data: category,
    error,
    isLoading,
  } = useAxios<CategoryWithAds>(formattedUrl, FETCH_OPTIONS);

  const filteredAds = category?.ads;

  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddPrice = (price: number): void => {
    setTotalPrice(totalPrice + price);
  };

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

  if (!filteredAds) {
    return <p>Data was null</p>;
  }

  return (
    <Section>
      <Container>
        <h2>{capitalize(category.name)}</h2>
      </Container>
      <AdList>
        {filteredAds.map((ad) => (
          <li key={ad.id}>
            <AdCard ad={ad} onAddPrice={handleAddPrice} />
          </li>
        ))}
      </AdList>
    </Section>
  );
}

const AdList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 40px;
`;

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
