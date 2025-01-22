import styled from "styled-components";
import { Suspense, useEffect, useReducer, useRef } from "react";
import { ZodError } from "zod";
import { Button } from "@/common/Button";
import {
  InputField,
  SelectTags,
  SelectCategory,
  TextareaField,
} from "@/components/ad_editor";
import Loader from "@/common/Loader";
import { IdInput } from "@/gql/graphql";
import { adFormReducer } from "@/reducers/adForm.reducer";
import { theme } from "@/themes/theme";
import { getOjectKeys } from "@/types/utils.types";
import { AdFormData, AdFormError, AdFormState } from "@/types/adForm.types";
import { convertPriceToCents, formatPrice } from "@/utils/format";
import { mapZodError } from "@/utils/formatErrors";
import { notifyError } from "@/utils/notify";

type AdEditorProps = {
  edit?: boolean;
  initialFormState: AdFormState;
  onSubmit: (formData: AdFormData) => Promise<void>;
};

export default function AdForm({
  edit = false,
  initialFormState,
  onSubmit,
}: AdEditorProps) {
  const [formState, dispatch] = useReducer(adFormReducer, initialFormState);
  const ref = useRef<HTMLFormElement>(null);

  const focusFirstFieldWithError = (error: AdFormError): void => {
    const keys = getOjectKeys(error);
    const firstInputWithError = keys.find((key) => error[key].length > 0);
    if (!ref.current || !firstInputWithError) return;
    const target = ref.current.elements.namedItem(firstInputWithError);
    if (target instanceof HTMLElement) target.focus();
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    nextValue?: string | number | IdInput,
    checked?: boolean,
  ): void => {
    dispatch({
      type: "update_input",
      payload: {
        name: e.target.name,
        nextValue: nextValue ?? e.target.value,
        // Conditionally add checked property to payload (applies only to tag(s) selection).
        ...(checked !== undefined && { checked }),
      },
    });
    dispatch({
      type: "update_status",
      payload: {
        nextStatus: "typing",
      },
    });
  };
  const handleBlur = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    nextValue?: string | number | IdInput,
  ): void => {
    dispatch({
      type: "validate_field",
      payload: {
        name: e.target.name,
        nextValue: nextValue ?? e.target.value,
      },
    });
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    try {
      e.preventDefault();
      dispatch({
        type: "update_status",
        payload: { nextStatus: "submitting" },
      });
      dispatch({
        type: "reset_form_error",
      });
      await onSubmit(formState.data);
      dispatch({
        type: "update_status",
        payload: { nextStatus: "success" },
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, formState.error);
        dispatch({
          type: "validate_form",
          payload: { nextFormError },
        });
      } else {
        console.error(error);
        notifyError(
          "Oops... an error has occured. Please check the form or try again later.",
        );
      }
      dispatch({
        type: "update_status",
        payload: { nextStatus: "error" },
      });
    }
  };

  useEffect(() => {
    const hasError = getOjectKeys(formState.error).some(
      (key) => formState.error[key].length > 0,
    );
    if (hasError && formState.status === "error") {
      focusFirstFieldWithError(formState.error);
    }
  }, [formState.status, formState.error]);

  return (
    <Form ref={ref} onSubmit={handleSubmit} noValidate>
      <InputField
        label="Title"
        placeholder="What's your ad's title?"
        value={formState.data.title}
        disabled={formState.status === "submitting"}
        errors={formState.error.title}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        required
      />
      <TextareaField
        label="Description"
        required
        placeholder="Try your best to describe your item to other customers..."
        value={formState.data.description}
        disabled={formState.status === "submitting"}
        errors={formState.error.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <InputField
        label="Owner"
        type="email"
        placeholder="Enter your email adress..."
        value={formState.data.owner}
        disabled={formState.status === "submitting"}
        errors={formState.error.owner}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <InputField
        label="Price($)"
        type="number"
        name="price"
        placeholder="Estimate the value of your item..."
        value={formatPrice(formState.data.price)}
        errors={formState.error.price}
        disabled={formState.status === "submitting"}
        onChange={(e) => {
          const priceInCents = convertPriceToCents(e.target.value);
          handleChange(e, priceInCents);
        }}
        onBlur={(e) => {
          handleBlur(e, convertPriceToCents(e.target.value));
        }}
        required
      />
      <InputField
        label="Picture"
        type="url"
        placeholder="Add a url picture of your item..."
        value={formState.data.picture}
        disabled={formState.status === "submitting"}
        errors={formState.error.picture}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <InputField
        label="Location"
        placeholder="Enter your city..."
        value={formState.data.location}
        disabled={formState.status === "submitting"}
        errors={formState.error.location}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <Suspense fallback={<Loader size="md" />}>
        <SelectCategory
          value={formState.data.category?.id ?? "none"}
          disabled={formState.status === "submitting"}
          errors={formState.error.category}
          onCategoryChange={(e) => {
            handleChange(e, { id: e.target.value });
          }}
          onCategoryBlur={(e) => {
            handleBlur(e, { id: e.target.value });
          }}
          onCategoryAdd={(newCategoryId: string) => {
            dispatch({
              type: "update_input",
              payload: {
                name: "category",
                nextValue: { id: newCategoryId },
              },
            });
          }}
        />
      </Suspense>
      <Suspense fallback={<Loader size="md" />}>
        <SelectTags
          selectedTags={formState.data.tags}
          disabled={formState.status === "submitting"}
          errors={formState.error.tags}
          onTagChange={(e) => {
            handleChange(e, Number(e.target.value), e.target.checked);
          }}
          onTagAdd={(newTagId: string) => {
            dispatch({
              type: "update_input",
              payload: {
                name: "tags",
                nextValue: Number(newTagId),
                checked: true,
              },
            });
          }}
        />
      </Suspense>
      <Button
        type="submit"
        color="primary"
        disabled={formState.status === "submitting"}
      >
        {edit ? "Update" : "Create"} ad
      </Button>
    </Form>
  );
}

const Form = styled.form`
  margin: 0 auto;
  padding: 16px 32px;
  width: min(100%, 640px);
  display: grid;
  gap: 16px;
  background-color: ${theme.color.white};
  border: ${theme.borderRadius.rounded_sm} solid ${theme.color.neutral.lightest};
  border-radius: ${theme.borderRadius.rounded_lg};
`;
