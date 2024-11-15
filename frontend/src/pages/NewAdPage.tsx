import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Reference, useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { Ad, AdContent } from "@tgc/common";
import { AdEditor } from "@/components/AdEditor";
import { CREATE_AD } from "@/graphql/createAd";
import { CORE_AD_FIELDS } from "@/graphql/fragments";
import MainContent from "@/layouts/PageContent";
import { initialFormState } from "@/reducers/adForm.reducer";
import { notifySuccess } from "@/utils/notify";

export default function NewAdPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [createAd] = useMutation<{ createAd: Ad }>(CREATE_AD);

  const postNewAd = async (parsedBody: AdContent): Promise<void> => {
    const { data, errors } = await createAd({
      variables: { data: parsedBody },
      /** Refetch other ads queries to update the UI with the new created ad.
       *
       * Since ads query is made from a component located on a different page (RecentAds), it is considered as an "inactive query" and cannot simply be re-fetched by passing the { refetchQueries: ["ads"] } option to the useMutation hook.
       *
       * There are several options to re-fetch the ads query after creating a new ad:
       *
       * 1. Use the useQuery hook to fetch the ads query in the NewAdPage component. This will make the ads query an "active query" and allow it to be re-fetched by passing the { refetchQueries: ["ads"] } option to the useMutation hook.
       *
       * 2. Change the fetchPolicy from "cache-first" (default value) of the ads query to "cache-and-network" to ensure that the ads query is always up-to-date with server data.
       *
       * 3. Manually update apollo's cache to trigger a re-fetch of ads queries. Any changes made to cached data inside of an update function are automatically broadcast to queries that are listening for changes to that data. Consequently, the application's UI will update to reflect these updated cached values.
       *
       * Here the latter option is used.
       */
      update: (cache, { data }) => {
        if (!data?.createAd) return;
        cache.modify({
          fields: {
            ads(existingAds = []) {
              const newAdRef = cache.writeFragment<Ad>({
                data: data.createAd,
                fragment: CORE_AD_FIELDS,
              });
              return [newAdRef, ...(existingAds as Reference[])] as Reference[];
            },
          },
        });
      },
    });

    if (errors !== undefined || !data) {
      console.error("Failed to create ad:", errors);
      throw new Error("Failed to create ad!");
    }

    notifySuccess("Ad successfully created!");
    setTimeout(() => {
      // Setting the option { replace: true } replaces the current entry in the history stack (instead of adding a new one). This prevents the user from going back to the form page.
      navigate(`/ads/${data.createAd.id.toString()}`, { replace: true });
    }, 3000);
  };

  return (
    <MainContent title="Post new ad">
      <AdEditor
        initialFormState={initialFormState}
        ref={formRef}
        onSubmit={postNewAd}
      />
    </MainContent>
  );
}
