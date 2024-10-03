import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import styled, { css } from "styled-components";
import { IoChevronDown } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { Category, Id, Tag, AdContentSchema } from "@tgc/common";
import { Button } from "@/common/Button";
import { useAxios } from "@/hooks/useAxios";
import { theme } from "@/themes/theme";
import { convertPriceToCents, formatPrice } from "@/utils/format";
import { mapZodError } from "@/utils/mapZodErrors";
import { createAd } from "@/services/ads";
import { notifyError, notifySuccess } from "@/utils/notify";

type FormState = {
  title: string;
  owner: string;
  price: number;
  picture: string;
  description: string;
  location: string;
  category: Id | undefined;
  tags: Id[];
};

type FormError = {
  title: string;
  owner: string;
  price: string;
  picture: string;
  description: string;
  location: string;
  category: string;
  tags: string;
};

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

const initialFormError: FormError = {
  title: "",
  owner: "",
  price: "",
  picture: "",
  description: "",
  location: "",
  category: "",
  tags: "",
};

// !TODO: simplify component...
// !TODO: replace formError state by array of errors (empty by default)...
// !TODO: refactor code with useReducer to handle state changes (a different event handler on each event listener)...

export default function NewAdPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: categories } = useAxios<Category[]>("categories");
  const { data: tags } = useAxios<Tag[]>("tags");
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const hasError = Object.values(formError).some((error) => error !== "");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const targetEl = e.target;
    let nextStateValue: string | number | undefined | Id | Id[] =
      targetEl.value;

    setFormError({ ...formError, [targetEl.name]: "" });

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
        const nextFormError = mapZodError(error, formError);
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
      const result = await createAd(parsedBody);
      notifySuccess("Ad successfully created!");
      setTimeout(() => {
        navigate(`/ads/${result.data.id.toString()}`, { replace: true });
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, initialFormError);
        setFormError(nextFormError);
        const firstInputWithError = Object.keys(nextFormError).filter(
          (key) => nextFormError[key as keyof typeof nextFormError] !== "",
        )[0];
        formRef.current?.[firstInputWithError].focus();
        return;
      }
      notifyError(
        "Could not create ad... Please check the form or try again later.",
      );
    } finally {
      console.log("finally");
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Container $margin>
        <Title>Post new ad</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
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
          <Button type="submit" $primary disabled={isSubmitting || hasError}>
            Create ad
          </Button>
        </Form>
      </Container>
    </Section>
  );
}

const { color, borderRadius } = theme;

const Section = styled.section`
  padding-inline: 16px;
  display: grid;
  gap: 16px;
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

const Title = styled.h2`
  margin-bottom: 32px;
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
  padding: 8px 8px;
  border: ${borderRadius.rounded_sm} solid ${color.neutral.lightest};
  border-radius: ${borderRadius.rounded_md};
  &::placeholder {
    color: color-mix(in srgb, ${color.neutral.light} 50%, transparent);
  }
  &:focus-visible {
    outline-color: ${color.primary};
  }
  ${({ type }) =>
    type === "checkbox" &&
    css`
      cursor: pointer;
    `}
  &[disabled] {
    cursor: not-allowed;
  }
  &:has(+ p) {
    border-color: ${color.status.danger};
  }
`;

const TextArea = styled.textarea`
  padding: 8px 8px;
  border: ${borderRadius.rounded_sm} solid ${color.neutral.lightest};
  border-radius: ${borderRadius.rounded_md};
  &::placeholder {
    color: color-mix(in srgb, ${color.neutral.light} 50%, transparent);
  }
  &:focus-visible {
    outline-color: ${color.primary};
  }
  &:has(+ p) {
    border-color: ${color.status.danger};
  }
`;

const Select = styled.select`
  position: relative;
  padding: 8px 8px;
  width: 100%;
  border: ${borderRadius.rounded_sm} solid ${color.neutral.lightest};
  border-radius: ${borderRadius.rounded_md};
  cursor: pointer;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  &::placeholder {
    color: color-mix(in srgb, ${color.neutral.light} 50%, transparent);
  }
  &:focus-visible {
    outline-color: ${color.primary};
  }
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
