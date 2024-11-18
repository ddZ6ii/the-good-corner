import styled, { css } from "styled-components";
import { useSuspenseQuery } from "@apollo/client";
import { IoChevronDown } from "react-icons/io5";
import { Category } from "@tgc/common";
import { Field, Info, Label, Text } from "@/components/editor";
import { GET_CATEGORIES } from "@/graphql";
import { baseInputStyle } from "@/themes/styles";
import { theme } from "@/themes/theme";

type SelectCategoryProps = {
  value: string | number;
  error: string;
  disabled: boolean;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCategoryBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
};

export default function SelectCategory({
  value,
  error,
  disabled,
  onCategoryChange,
  onCategoryBlur,
}: SelectCategoryProps) {
  const { data: { categories = [] } = {}, error: errorCategories } =
    useSuspenseQuery<{
      categories: Category[];
    }>(GET_CATEGORIES);

  if (errorCategories) {
    return <p>Could not retrieve categories...</p>;
  }

  return (
    <Field>
      <Label htmlFor="category">
        Category <Info>*</Info>
      </Label>
      <Container>
        <Select
          name="category"
          id="category"
          value={value}
          multiple={false}
          onChange={onCategoryChange}
          onBlur={onCategoryBlur}
          disabled={disabled}
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
      {error && <Text>Please select a category</Text>}
    </Field>
  );
}

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
