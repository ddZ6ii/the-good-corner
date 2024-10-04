import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AdContent } from "@tgc/common";
import { AdForm } from "@/components/AdForm";
import MainContent from "@/layouts/MainContent";
import { initialFormState } from "@/reducers/adForm.reducer";
import { createAd } from "@/services/ads";
import { notifySuccess } from "@/utils/notify";

export default function NewAdPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const postNewAd = async (parsedBody: AdContent): Promise<void> => {
    const result = await createAd(parsedBody);
    notifySuccess("Ad successfully created!");
    setTimeout(() => {
      navigate(`/ads/${result.data.id.toString()}`, { replace: true });
    }, 3000);
  };

  return (
    <MainContent title="Post new ad">
      <AdForm
        initialFormState={initialFormState}
        ref={formRef}
        onSubmit={postNewAd}
      />
    </MainContent>
  );
}
