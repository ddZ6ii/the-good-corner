import { useParams } from "react-router-dom";
import { useAxios } from "@/hooks/useAxios";
import { CategoryWithAds, IdParam, IdParamSchema } from "@tgc/common";
import Loader from "@/common/Loader";
import MainContent from "@/layouts/MainContent";
import AdGallery from "@/layouts/AdGallery";
import { capitalize } from "@/utils/format";
import { sortAdsByCreationDate } from "@/utils/sort";

export default function CategoryPage() {
  const params = useParams<IdParam>();
  const { id } = IdParamSchema.parse(params);
  const {
    data: category,
    error,
    isLoading,
  } = useAxios<CategoryWithAds>(`categories/${id}`);

  const pageTitle = capitalize(category?.name);

  if (isLoading) {
    return (
      <MainContent title={pageTitle}>
        <Loader />
      </MainContent>
    );
  }

  if (error || category === null) {
    return (
      <MainContent title={pageTitle}>
        <p>No exisiting category...</p>
      </MainContent>
    );
  }

  const filteredAds = sortAdsByCreationDate(category.ads);

  return (
    <MainContent title={pageTitle}>
      <AdGallery ads={filteredAds} />
    </MainContent>
  );
}
