import styled from "styled-components";
import { useRef, useState } from "react";
import { ZodError } from "zod";
import { useMutation } from "@apollo/client";
import { Category, CategoryContentSchema } from "@tgc/common";
import { Button } from "@/common/Button";
import { InputField } from "@/components/editor";
import { CREATE_CATEGORY, GET_CATEGORIES } from "@/graphql";
import { capitalize } from "@/utils/format";

type Data = {
  id: number;
  name: string;
};

type CategoryEditorProps<T extends Data[]> = {
  label: string;
  data: T;
  onCategoryAdd: (newCategoryId: string) => void;
};

export function CategoryEditor<T extends Data[]>({
  label,
  data,
  onCategoryAdd,
}: CategoryEditorProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [newCategory, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [createCategory] = useMutation<{ createCategory: Category }>(
    CREATE_CATEGORY,
  );

  const focusInput = () => {
    if (!formRef.current) return;
    const target = formRef.current.elements.namedItem(label);
    if (target instanceof HTMLElement) target.focus();
  };
  const checkIfAlreadyExist = (newName: string) => {
    return data.some((el) => el.name === newName.trim().toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setCategory(e.target.value);
  };
  const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
    try {
      setError("");
      CategoryContentSchema.parse({ name: newCategory });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const { name: zodError = [] } = error.formErrors.fieldErrors;
        setError(zodError[0]);
      } else {
        console.error("error");
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prevent parent's form submission (mandatory for nested forms even if using portals).
    e.stopPropagation();
    try {
      // Update form status.
      setSubmitting(true);
      // Check form validity.
      if (error) {
        focusInput();
        return;
      }
      // Check for already existing category.
      const alreadyExist = checkIfAlreadyExist(newCategory);
      if (alreadyExist) {
        focusInput();
        setError(`${capitalize(label)} already exists!`);
        return;
      }
      // Add new category to database.
      const createdCategory = await createCategory({
        variables: {
          data: { name: newCategory.trim().toLowerCase() },
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
      // Reset form.
      setCategory("");
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InputField
        label={label}
        placeholder={`Enter a new ${label} name...`}
        value={newCategory}
        disabled={submitting}
        error={error}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SubmitButton type="submit" disabled={submitting}>
        Create {label}
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const SubmitButton = styled(Button)`
  margin-left: auto;
  width: fit-content;
`;
