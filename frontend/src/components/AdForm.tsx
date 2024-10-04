import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ZodError } from "zod";
import styled, { css } from "styled-components";
import { IoChevronDown } from "react-icons/io5";
import { useAxios } from "@/hooks/useAxios";
import {
  AdContent,
  AdContentSchema,
  Category,
  getOjectKeys,
  Id,
  Tag,
} from "@tgc/common";
import { Button } from "@/common/Button";
import { theme } from "@/themes/theme";
import { FormError, FormState } from "@/types/form.types";
import { convertPriceToCents, formatPrice } from "@/utils/format";
import { mapZodError } from "@/utils/mapZodErrors";
import { notifyError } from "@/utils/notify";
import { baseInputStyle } from "@/themes/styles";

type AdFormProps = {
  initialFormState: FormState;
  initialFormError: FormError;
  errorMessage?: string;
  onSubmit: (parsedBody: AdContent) => Promise<void>;
};

// !TODO: refactor code with useReducer to handle state changes (a different event handler on each event listener)...

export const AdForm = forwardRef<HTMLFormElement, AdFormProps>(function AdForm(
  { initialFormState, initialFormError, onSubmit },
  forwardedRef,
) {
  const { data: categories } = useAxios<Category[]>("categories");
  const { data: tags } = useAxios<Tag[]>("tags");
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useRef<HTMLFormElement>(null);
  useImperativeHandle<HTMLFormElement, HTMLFormElement>(forwardedRef, () => {
    if (ref.current === null) {
      throw new Error("ref.current is null");
    }
    return ref.current;
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const targetEl = e.target;
    let nextStateValue: string | number | undefined | Id | Id[] =
      targetEl.value;

    const nextFormError = { ...formError };
    if (targetEl.name in formError) {
      delete nextFormError[targetEl.name as keyof FormError];
    }
    setFormError(nextFormError);

    if (targetEl.name === "price") {
      nextStateValue = convertPriceToCents(targetEl.value);
    }

    if (targetEl.name === "tags") {
      const nextValue = parseInt(targetEl.value, 10);
      const isChecked = formState.tags.some((tag) => tag.id === nextValue);
      nextStateValue = isChecked
        ? formState.tags.filter((tag) => tag.id !== nextValue)
        : [...formState.tags, { id: nextValue }];
    }
    if (targetEl.name === "category") {
      nextStateValue = { id: parseInt(targetEl.value, 10) };
    }
    setFormState((prevState) => ({
      ...prevState,
      [targetEl.name]: nextStateValue,
    }));
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    try {
      const targetEl = e.target;
      let nextValue: string | number | undefined | Id | Id[] = targetEl.value;
      if (targetEl.name === "tags") return;
      if (targetEl.name === "category") {
        nextValue = { id: parseInt(targetEl.value, 10) };
      }
      if (targetEl.name === "price") {
        nextValue = convertPriceToCents(targetEl.value);
      }
      AdContentSchema.partial().parse({
        [targetEl.name]: nextValue,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, { ...formError });
        setFormError(nextFormError);
      }
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setFormError(initialFormError);
      const parsedBody = AdContentSchema.parse(formState);
      await onSubmit(parsedBody);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, initialFormError);
        setFormError(nextFormError);
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
      setIsSubmitting(false);
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
          value={formState.title}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {formError.title && <Text>{formError.title}</Text>}
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
          value={formState.description}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        ></TextArea>
        {formError.description && <Text>{formError.description}</Text>}
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
          value={formState.owner}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {formError.owner && <Text>{formError.owner}</Text>}
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
          value={formatPrice(formState.price)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {formError.price && <Text>{formError.price}</Text>}
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
          value={formState.picture}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {formError.picture && <Text>{formError.picture}</Text>}
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
          value={formState.location}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {formError.location && <Text>{formError.location}</Text>}
      </Field>
      <Field>
        <Label htmlFor="category">
          Category <Info>*</Info>
        </Label>
        <Container>
          <Select
            name="category"
            id="category"
            value={formState.category?.id ?? "none"}
            multiple={false}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
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
        {formError.category && <Text>Please select a category</Text>}
      </Field>
      <Fieldset disabled={isSubmitting}>
        <Legend>Tag(s)</Legend>
        <Wrapper>
          {tags?.map((tag) => (
            <Field key={tag.id} $inline>
              <Input
                type="checkbox"
                id={tag.name}
                name="tags"
                value={tag.id}
                checked={formState.tags.some((t) => t.id === tag.id)}
                onChange={handleChange}
              />
              <Label htmlFor={tag.name}>{tag.name}</Label>
            </Field>
          ))}
        </Wrapper>
        {formError.tags && <Text>{formError.tags}</Text>}
      </Fieldset>
      {/* <Button type="submit" $primary disabled={isSubmitting || hasError}> */}
      <Button type="submit" $primary disabled={isSubmitting}>
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
