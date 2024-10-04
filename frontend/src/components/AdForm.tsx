import { forwardRef, useImperativeHandle, useReducer, useRef } from "react";
import { ZodError } from "zod";
import styled, { css } from "styled-components";
import { IoChevronDown } from "react-icons/io5";
import { useAxios } from "@/hooks/useAxios";
import {
  AdContent,
  AdContentSchema,
  Category,
  getOjectKeys,
  Tag,
} from "@tgc/common";
import { Button } from "@/common/Button";
import { theme } from "@/themes/theme";
import { convertPriceToCents, formatPrice } from "@/utils/format";
import { mapZodError } from "@/utils/mapZodErrors";
import { notifyError } from "@/utils/notify";
import { baseInputStyle } from "@/themes/styles";
import { AdFormState } from "@/types/adForm.types";
import { adFormReducer } from "@/reducers/adForm.reducer";

type AdFormProps = {
  initialFormState: AdFormState;
  onSubmit: (parsedBody: AdContent) => Promise<void>;
};

export const AdForm = forwardRef<HTMLFormElement, AdFormProps>(function AdForm(
  { initialFormState, onSubmit },
  forwardedRef,
) {
  const { data: categories } = useAxios<Category[]>("categories");
  const { data: tags } = useAxios<Tag[]>("tags");
  const [formState, dispatch] = useReducer(adFormReducer, initialFormState);

  const ref = useRef<HTMLFormElement>(null);
  useImperativeHandle<HTMLFormElement, HTMLFormElement>(forwardedRef, () => {
    if (ref.current === null) {
      throw new Error("ref.current is null");
    }
    return ref.current;
  }, []);

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
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <IoChevronDown />
        </Container>
        {formState.error.category && <Text>Please select a category</Text>}
      </Field>
      <Fieldset disabled={formState.isSubmitting}>
        <Legend>Tag(s)</Legend>
        <Wrapper>
          {tags?.map((tag) => (
            <Field key={tag.id} $inline>
              <Input
                type="checkbox"
                id={tag.name}
                name="tags"
                value={tag.id}
                checked={formState.data.tags.some((t) => t.id === tag.id)}
                onChange={(e) => {
                  dispatch({
                    type: "update_input",
                    payload: {
                      name: e.target.name,
                      nextValue: parseInt(e.target.value, 10),
                      checked: e.target.checked,
                    },
                  });
                }}
              />
              <Label htmlFor={tag.name}>{tag.name}</Label>
            </Field>
          ))}
        </Wrapper>
        {formState.error.tags && <Text>{formState.error.tags}</Text>}
      </Fieldset>
      <Button type="submit" $primary disabled={formState.isSubmitting}>
        Create ad
      </Button>
    </Form>
  );
});

const { color, borderRadius } = theme;

const Form = styled.form`
  margin: 0 auto;
  padding: 16px 32px;
  width: min(100%, 640px);
  display: grid;
  gap: 16px;
  background-color: ${color.white};
  border: ${borderRadius.rounded_sm} solid ${color.neutral.lightest};
  border-radius: ${borderRadius.rounded_lg};
`;

const Container = styled.div<{ $margin?: boolean }>`
  position: relative;
  ${({ $margin }) =>
    $margin &&
    css`
      margin-bottom: 32px;
    `}
  &:has(+ p) select {
    border-color: ${color.status.danger};
    &:focus-visible {
      outline-color: ${color.status.danger};
    }
  }
`;

const Field = styled.div<{ $inline?: boolean }>`
  display: grid;
  text-align: left;
  gap: 8px;
  font-size: 14px;
  ${({ $inline }) =>
    $inline &&
    css`
      grid-template-columns: auto 1fr;
      gap: 4px;
    `}
  & input[type="checkbox"] + label {
    cursor: pointer;
    font-weight: normal;
  }
`;

const Label = styled.label`
  color: ${color.neutral.light};
  font-weight: bold;
`;

const Input = styled.input`
  ${baseInputStyle}
  ${({ type }) =>
    type === "checkbox" &&
    css`
      cursor: pointer;
    `}
  &[disabled] {
    cursor: not-allowed;
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
    stroke: color-mix(in srgb, ${color.neutral.light} 80%, transparent);
  }
`;

const Fieldset = styled.fieldset`
  padding: 16px;
  border: ${borderRadius.rounded_sm} solid ${color.neutral.lightest};
  border-radius: ${borderRadius.rounded_md};
  & input[type="checkbox"] + label {
    color: black;
  }
  &::placeholder {
    color: color-mix(in srgb, ${color.neutral.light} 50%, transparent);
  }
  &:focus-visible {
    outline-color: ${color.primary};
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
`;

const Legend = styled.legend`
  text-align: left;
  font-size: 14px;
  color: ${color.neutral.light};
  font-weight: bold;
`;

const Text = styled.p`
  color: ${color.status.danger};
  font-size: 12px;
`;

const Info = styled.span`
  color: ${color.status.danger};
`;
