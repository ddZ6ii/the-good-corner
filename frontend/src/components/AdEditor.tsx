import styled from "styled-components";
import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import { ZodError } from "zod";
import { AdContent, AdContentSchema, getOjectKeys, Id } from "@tgc/common";
import { Button } from "@/common/Button";
import {
  InputField,
  SelectTags,
  SelectCategory,
  TextareaField,
} from "@/components/editor";
import Loader from "@/common/Loader";
import { adFormReducer } from "@/reducers/adForm.reducer";
import { theme } from "@/themes/theme";
import { AdFormError, AdFormState } from "@/types/adForm.types";
import { convertPriceToCents, formatPrice } from "@/utils/format";
import { mapZodError } from "@/utils/mapZodErrors";
import { notifyError } from "@/utils/notify";

type AdEditorProps = {
  edit?: boolean;
  initialFormState: AdFormState;
  onSubmit: (parsedBody: AdContent) => Promise<void>;
};

export const AdEditor = forwardRef<HTMLFormElement, AdEditorProps>(
  function AdForm({ edit = false, initialFormState, onSubmit }, forwardedRef) {
    const [formState, dispatch] = useReducer(adFormReducer, initialFormState);

    const ref = useRef<HTMLFormElement>(null);
    useImperativeHandle<HTMLFormElement, HTMLFormElement>(forwardedRef, () => {
      if (ref.current === null) {
        throw new Error("ref.current is null");
      }
      return ref.current;
    }, []);

    const focusFirstFieldWithError = (error: AdFormError): void => {
      const keys = getOjectKeys(error);
      const firstInputWithError = keys.find((key) => error[key] !== "");
      if (!ref.current || !firstInputWithError) return;
      const target = ref.current.elements.namedItem(firstInputWithError);
      if (target instanceof HTMLElement) target.focus();
    };
    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      nextValue?: string | number | Id,
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
    };
    const handleBlur = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      nextValue?: string | number | Id,
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
          type: "update_submit_status",
          payload: { isSubmitting: true },
        });
        dispatch({
          type: "reset_form_error",
        });
        const parsedBody = AdContentSchema.parse(formState.data);
        await onSubmit(parsedBody);
      } catch (error: unknown) {
        if (error instanceof ZodError) {
          const nextFormError = mapZodError(error, formState.error);
          dispatch({
            type: "validate_form",
            payload: { nextFormError },
          });
          focusFirstFieldWithError(nextFormError);
        } else {
          notifyError(
            "Oops... an error has occured. Please check the form or try again later.",
          );
          console.error(error);
        }
        dispatch({
          type: "update_submit_status",
          payload: { isSubmitting: false },
        });
      }
    };

    return (
      <Form ref={ref} onSubmit={handleSubmit} noValidate>
        <InputField
          label="Title"
          placeholder="What's your ad's title?"
          value={formState.data.title}
          disabled={formState.isSubmitting}
          error={formState.error.title}
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
          disabled={formState.isSubmitting}
          error={formState.error.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputField
          label="Owner"
          type="email"
          placeholder="Enter your email adress..."
          value={formState.data.owner}
          disabled={formState.isSubmitting}
          error={formState.error.owner}
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
          error={formState.error.price}
          disabled={formState.isSubmitting}
          onChange={(e) => {
            handleChange(e, convertPriceToCents(e.target.value));
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
          disabled={formState.isSubmitting}
          error={formState.error.picture}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <InputField
          label="Location"
          placeholder="Enter your city..."
          value={formState.data.location}
          disabled={formState.isSubmitting}
          error={formState.error.location}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <Suspense fallback={<Loader size="md" />}>
          <SelectCategory
            value={formState.data.category?.id ?? "none"}
            disabled={formState.isSubmitting}
            error={formState.error.category}
            onCategoryChange={(e) => {
              handleChange(e, { id: parseInt(e.target.value, 10) });
            }}
            onCategoryBlur={(e) => {
              handleBlur(e, { id: parseInt(e.target.value, 10) });
            }}
          />
        </Suspense>
        <Suspense fallback={<Loader size="md" />}>
          <SelectTags
            selectedTags={formState.data.tags}
            disabled={formState.isSubmitting}
            error={formState.error.tags}
            onTagChange={(e) => {
              handleChange(e, Number(e.target.value), e.target.checked);
            }}
          />
        </Suspense>
        <Button type="submit" $primary disabled={formState.isSubmitting}>
          {edit ? "Update" : "Create"} ad
        </Button>
      </Form>
    );
  },
);

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
