import styled from "styled-components";
import { useRef, useState } from "react";
import { ZodError } from "zod";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Tag, TagContentSchema } from "@tgc/common";
import { Button } from "@/common/Button";
import { InputField } from "@/components/editor";
import { GET_TAGS_BY_NAME, CREATE_TAG, GET_TAGS } from "@/graphql";
import { capitalize } from "@/utils/format";

type TagEditorProps = {
  label: string;
  onTagAdd: (newTagId: string) => void;
};

export function TagEditor({ label, onTagAdd }: TagEditorProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [newTag, setTag] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [getTagByName] = useLazyQuery<{
    tags: Tag[];
  }>(GET_TAGS_BY_NAME);

  const [createTag] = useMutation<{ createTag: Tag }>(CREATE_TAG);

  const focusInput = () => {
    if (!formRef.current) return;
    const target = formRef.current.elements.namedItem(label);
    if (target instanceof HTMLElement) target.focus();
  };
  const checkIfAlreadyExist = async (tagName: string) => {
    const { data, error: errorGetTagByName } = await getTagByName({
      variables: { name: tagName },
    });
    if (errorGetTagByName || !data) {
      throw new Error("Failed to get tags by name");
    }
    const alreadyExist = data.tags.some(
      (tag) => tag.name === newTag.trim().toLowerCase(),
    );
    return alreadyExist;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setTag(e.target.value);
  };
  const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
    try {
      setError("");
      TagContentSchema.parse({ name: newTag });
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
      // Check for already existing tag.
      const alreadyExist = await checkIfAlreadyExist(newTag);
      if (alreadyExist) {
        focusInput();
        setError(`${capitalize(label)} already exists!`);
        return;
      }
      // Add new tag to database.
      const createdTag = await createTag({
        variables: {
          data: { name: newTag.trim().toLowerCase() },
        },
        // Refetch tags after adding a new one.
        refetchQueries: [{ query: GET_TAGS }],
      });
      if (!createdTag.data) {
        throw new Error("Failed to create tag");
      }
      // Set newly added tag as current selection in the parent form.
      const { id: newTagId } = createdTag.data.createTag;
      onTagAdd(newTagId as unknown as string);
      // Reset form.
      setTag("");
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
        value={newTag}
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
