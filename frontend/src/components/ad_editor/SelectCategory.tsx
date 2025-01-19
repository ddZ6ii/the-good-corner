import styled, { css } from "styled-components";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Button } from "@/common/Button";
import { Editor } from "@/components/Editor";
import { Modal } from "@/common/Modal";
import { Field, Info, Label, Text } from "@/components/ad_editor";
import { GET_CATEGORIES } from "@/graphql/categories";
import { CREATE_CATEGORY } from "@/graphql/createCategory";
import { CategoryContentSchema } from "@/schemas/category.validation";
import { baseInputStyle } from "@/themes/styles";
import { theme } from "@/themes/theme";
import { notifySuccess } from "@/utils/notify";

type SelectCategoryProps = {
  value: string;
  errors: string[];
  disabled: boolean;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCategoryBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onCategoryAdd: (newCategoryId: string) => void;
};

export default function SelectCategory({
  value,
  errors,
  disabled,
  onCategoryChange,
  onCategoryBlur,
  onCategoryAdd,
}: SelectCategoryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: { categories = [] } = {}, error: errorCategories } =
    useSuspenseQuery(GET_CATEGORIES);

  const [createCategory] = useMutation(CREATE_CATEGORY);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCategory = async (newCategoryName: string) => {
    // Add new category to database.
    const createdCategory = await createCategory({
      variables: {
        data: { name: newCategoryName.trim().toLowerCase() },
      },
      // Refetch categories after adding a new one.
      refetchQueries: [{ query: GET_CATEGORIES }],
    });
    if (!createdCategory.data) {
      throw new Error("Failed to create category");
    }
    // Set newly added category as current selection in the parent form.
    const { id: newCategoryId } = createdCategory.data.createCategory;
    onCategoryAdd(newCategoryId as unknown as string);

    closeModal();
    notifySuccess("Category successfully created!");
  };

  if (errorCategories) {
    return <p>Could not retrieve categories...</p>;
  }

  return (
    <>
      <Field>
        <Label htmlFor="category">
          Category <Info>*</Info>
        </Label>

        <AddCategoryButton
          type="button"
          title="Add new category"
          aria-label="Add new category"
          $primary
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <IoMdAddCircleOutline />
        </AddCategoryButton>

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
        {errors.length > 0 && <Text>Please select a category</Text>}
      </Field>

      {/* Pass the "portal" prop to avoid nested forms (prevents inner form submission to trigger parent form submission). */}
      <Modal portal open={isModalOpen} onClose={closeModal}>
        <Editor
          label="category"
          data={categories}
          validationSchema={CategoryContentSchema}
          onAdd={handleAddCategory}
        />
      </Modal>
    </>
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

const AddCategoryButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  translate: 80px -4px;
  padding: 0;
  min-width: initial;
  height: unset;
  border: none;
  background-color: ${theme.color.white};
  border-radius: ${theme.borderRadius.pill};
  font-size: 1.5rem;
  & > svg {
    fill: ${theme.color.primary.main};
    z-index: 999;
  }
  &:is(:hover, :focus-visible) {
    background-color: ${theme.color.primary.main};
    & > svg {
      fill: ${theme.color.white};
    }
  }
`;
