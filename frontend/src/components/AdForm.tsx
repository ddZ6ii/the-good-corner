import styled, { css } from "styled-components";
import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import { ZodError } from "zod";
import { IoChevronDown } from "react-icons/io5";
import {
  AdContent,
  AdContentSchema,
  Category,
  getOjectKeys,
} from "@tgc/common";
import { Button } from "@/common/Button";
import { theme } from "@/themes/theme";
import { convertPriceToCents, formatPrice } from "@/utils/format";
import { mapZodError } from "@/utils/mapZodErrors";
import { notifyError } from "@/utils/notify";
import { baseInputStyle } from "@/themes/styles";
import { AdFormState } from "@/types/adForm.types";
import { adFormReducer } from "@/reducers/adForm.reducer";
import { useQuery } from "@apollo/client";
import Loader from "@/common/Loader";
import { Input } from "@/components/form/Input";
import { Field } from "@/components/form/Field";
import { Label } from "@/components/form/Label";
import { Text } from "@/components/form/Text";
import Tags from "@/components/form/Tags";
import { GET_CATEGORIES } from "@/graphql/categories";

type AdFormProps = {
  initialFormState: AdFormState;
  onSubmit: (parsedBody: AdContent) => Promise<void>;
};

// !TODO: finish refactor form component...
// !TODO: use a context and a provider to pass info to subcomponents...
export const AdForm = forwardRef<HTMLFormElement, AdFormProps>(function AdForm(
  { initialFormState, onSubmit },
  forwardedRef,
) {
  const [formState, dispatch] = useReducer(adFormReducer, initialFormState);
  const {
    data: { categories = [] } = {},
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  const ref = useRef<HTMLFormElement>(null);
  useImperativeHandle<HTMLFormElement, HTMLFormElement>(forwardedRef, () => {
    if (ref.current === null) {
      throw new Error("ref.current is null");
    }
    return ref.current;
  }, []);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "update_input",
      payload: {
        name: e.target.name,
        nextValue: Number(e.target.value),
        checked: e.target.checked,
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
        const keys = getOjectKeys(nextFormError);
        const firstInputWithError = keys.find(
          (key) => nextFormError[key] !== "",
        );
        if (!ref.current || !firstInputWithError) return;
        const target = ref.current.elements.namedItem(firstInputWithError);
        if (target instanceof HTMLElement) target.focus();
        return;
      }
      notifyError(
        "Oops... an error has occured. Please check the form or try again later.",
      );
      console.error(error);
    } finally {
      dispatch({
        type: "update_submit_status",
        payload: { isSubmitting: false },
      });
    }
  };

  return (
    <Form ref={ref} onSubmit={handleSubmit} noValidate>
      <Field>
        <Label htmlFor="title">
          Title <Info>*</Info>
        </Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="What's your ad's title?"
          autoFocus
          value={formState.data.title}
          onChange={(e) => {
            dispatch({
              type: "update_input",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          onBlur={(e) => {
            dispatch({
              type: "validate_field",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          disabled={formState.isSubmitting}
        />
        {formState.error.title && <Text>{formState.error.title}</Text>}
      </Field>
      <Field>
        <Label htmlFor="description">
          Description <Info>*</Info>
        </Label>
        <TextArea
          name="description"
          id="description"
          rows={10}
          placeholder="Try your best to describe your item to other customers..."
          value={formState.data.description}
          onChange={(e) => {
            dispatch({
              type: "update_input",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          onBlur={(e) => {
            dispatch({
              type: "validate_field",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          disabled={formState.isSubmitting}
        ></TextArea>
        {formState.error.description && (
          <Text>{formState.error.description}</Text>
        )}
      </Field>
      <Field>
        <Label htmlFor="owner">
          Owner <Info>*</Info>
        </Label>
        <Input
          type="email"
          name="owner"
          id="owner"
          placeholder="Enter your email adress..."
          value={formState.data.owner}
          onChange={(e) => {
            dispatch({
              type: "update_input",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          onBlur={(e) => {
            dispatch({
              type: "validate_field",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          disabled={formState.isSubmitting}
        />
        {formState.error.owner && <Text>{formState.error.owner}</Text>}
      </Field>
      <Field>
        <Label htmlFor="price">
          Price($) <Info>*</Info>
        </Label>
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Estimate the value of your item..."
          value={formatPrice(formState.data.price)}
          onChange={(e) => {
            dispatch({
              type: "update_input",
              payload: {
                name: e.target.name,
                nextValue: convertPriceToCents(e.target.value),
              },
            });
          }}
          onBlur={(e) => {
            dispatch({
              type: "validate_field",
              payload: {
                name: e.target.name,
                nextValue: convertPriceToCents(e.target.value),
              },
            });
          }}
          disabled={formState.isSubmitting}
        />
        {formState.error.price && <Text>{formState.error.price}</Text>}
      </Field>
      <Field>
        <Label htmlFor="picture">
          Picture <Info>*</Info>
        </Label>
        <Input
          type="url"
          name="picture"
          id="picture"
          placeholder="Add a url picture of your item..."
          value={formState.data.picture}
          onChange={(e) => {
            dispatch({
              type: "update_input",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          onBlur={(e) => {
            dispatch({
              type: "validate_field",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          disabled={formState.isSubmitting}
        />
        {formState.error.picture && <Text>{formState.error.picture}</Text>}
      </Field>
      <Field>
        <Label htmlFor="location">
          Location <Info>*</Info>
        </Label>
        <Input
          type="text"
          name="location"
          id="location"
          placeholder="Enter your city..."
          value={formState.data.location}
          onChange={(e) => {
            dispatch({
              type: "update_input",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          onBlur={(e) => {
            dispatch({
              type: "validate_field",
              payload: { name: e.target.name, nextValue: e.target.value },
            });
          }}
          disabled={formState.isSubmitting}
        />
        {formState.error.location && <Text>{formState.error.location}</Text>}
      </Field>
      <Field>
        <Label htmlFor="category">
          Category <Info>*</Info>
        </Label>
        <Container>
          <Select
            name="category"
            id="category"
            value={formState.data.category?.id ?? "none"}
            multiple={false}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                payload: {
                  name: e.target.name,
                  nextValue: { id: parseInt(e.target.value, 10) },
                },
              });
            }}
            onBlur={(e) => {
              dispatch({
                type: "validate_field",
                payload: {
                  name: e.target.name,
                  nextValue: { id: parseInt(e.target.value, 10) },
                },
              });
            }}
            disabled={formState.isSubmitting}
          >
            <option key={crypto.randomUUID()} value="none" disabled hidden>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <IoChevronDown />
        </Container>
        {formState.error.category && <Text>Please select a category</Text>}
      </Field>
      <Suspense fallback={<Loader size="md" />}>
        <Tags
          submittting={formState.isSubmitting}
          tagsData={formState.data.tags}
          tagsError={formState.error.tags}
          onTagChange={handleTagChange}
        />
      </Suspense>
      <Button type="submit" $primary disabled={formState.isSubmitting}>
        Create ad
      </Button>
    </Form>
  );
});

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

const Container = styled.div<{ $margin?: boolean }>`
  position: relative;
  ${({ $margin }) =>
    $margin &&
    css`
      margin-bottom: 32px;
    `}
  &:has(+ p) select {
    border-color: ${theme.color.status.danger};
    &:focus-visible {
      outline-color: ${theme.color.status.danger};
    }
  }
`;

const TextArea = styled.textarea`
  ${baseInputStyle}
`;

const Select = styled.select`
  ${baseInputStyle}
  position: relative;
  width: 100%;
  cursor: pointer;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  & + svg {
    position: absolute;
    top: 50%;
    right: 12px;
    translate: 0 -50%;
    stroke: color-mix(in srgb, ${theme.color.neutral.light} 80%, transparent);
  }
`;

const Info = styled.span`
  color: ${theme.color.status.danger};
`;
