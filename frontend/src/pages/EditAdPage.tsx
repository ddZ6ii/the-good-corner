import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Ad, AdContent, IdParam, IdParamSchema } from "@tgc/common";
import Loader from "@/common/Loader";
import { AdEditor } from "@/components/AdEditor";
import { GET_AD, UPDATE_AD } from "@/graphql";
import MainContent from "@/layouts/PageContent";
import { initialFormState } from "@/reducers/adForm.reducer";
import { mapAdToFormData } from "@/utils/mapAdtoFormData";
import { notifySuccess } from "@/utils/notify";

export default function EditAdPage() {
  const navigate = useNavigate();
  const params = useParams<IdParam>();
  const formRef = useRef<HTMLFormElement>(null);
  const { id } = IdParamSchema.parse(params);
  const {
    data: { ad } = {},
    error,
    loading,
  } = useQuery<{ ad: Ad }>(GET_AD, {
    variables: { id },
    skip: !id,
  });
  const [updateAd] = useMutation<{ updateAd: Ad }>(UPDATE_AD);

  if (loading) {
    return <Loader $center size="lg" />;
  }

  if (error || !ad) {
    if (error) console.error(error);
    return <p>No ad found!</p>;
  }

  const initialForm = {
    ...initialFormState,
    data: mapAdToFormData(ad),
  };

  const editAd = async (parsedBody: AdContent): Promise<void> => {
    const { data, errors } = await updateAd({
      variables: { data: parsedBody, id },
      /** Refetch the ad after edition.
       *
       * This is the most straighforward approach to reflect the changes on the UI from the AdPage (active query). As a side effect, changes will also be reflected on the HomePage (even without refetching the ads query) because components share the cache.
       *
       * This solution is less optimal than manually updating the cache since it involves an additional network request. However manually updating the cache is tedious and requires the query to return all of the ad's fields to work, even though only the `id` is needed.
       */
      refetchQueries: [{ query: GET_AD, variables: { id } }],
    });

    if (errors !== undefined || !data) {
      console.error("Failed to update ad:", errors);
      throw new Error("Failed to update ad!");
    }

    notifySuccess("Ad successfully updated!");
    setTimeout(() => {
      // Setting the option { replace: true } replaces the current entry in the history stack (instead of adding a new one). This prevents the user from going back to the form page.
      navigate(`/ads/${data.updateAd.id.toString()}`, { replace: true });
    }, 3000);
  };

  return (
    <MainContent title="Edit your ad">
      <AdEditor
        initialFormState={initialForm}
        ref={formRef}
        onSubmit={editAd}
        edit
      />
    </MainContent>
  );
}
