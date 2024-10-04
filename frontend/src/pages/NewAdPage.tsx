import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AdContent } from "@tgc/common";
import { AdForm } from "@/components/AdForm";
import MainContent from "@/layouts/MainContent";
import { createAd } from "@/services/ads";
import { FormError, FormState } from "@/types/form.types";
import { notifySuccess } from "@/utils/notify";

/** Test configuration.
 * ----------------------
 * const initialFormState: FormState = {
  title: "this is a title",
  owner: "myemail@gmail.com",
  price: 199,
  picture:
    "https://static1.squarespace.com/static/56acc1138a65e2a286012c54/56ad05dfb09f9505c22897ef/5756ca76d51cd46816d2aa74/1613662125137/pixabaytest6-7.jpg?format=1500w",
  description: "this is a very long description...",
  location: "petaouchnok",
  category: { id: 4 },
  tags: [{ id: 1 }, { id: 3 }],
};
 */

const initialFormState: FormState = {
  title: "this is a title",
  owner: "myemail@gmail.com",
  price: 199,
  picture:
    "https://static1.squarespace.com/static/56acc1138a65e2a286012c54/56ad05dfb09f9505c22897ef/5756ca76d51cd46816d2aa74/1613662125137/pixabaytest6-7.jpg?format=1500w",
  description: "this is a very long description...",
  location: "petaouchnok",
  category: undefined,
  tags: [{ id: 1 }, { id: 3 }],
};

// const initialFormState: FormState = {
//   title: "",
//   owner: "",
//   price: 0,
//   picture: "",
//   description: "",
//   location: "",
//   category: undefined,
//   tags: [],
// };

const initialFormError: FormError = {};

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
        initialFormError={initialFormError}
        ref={formRef}
        onSubmit={postNewAd}
      />
    </MainContent>
  );
}
