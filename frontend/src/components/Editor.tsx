import styled from "styled-components";
import { useRef, useState } from "react";
import { z, ZodError } from "zod";
import { Button } from "@/common/Button";
import { InputField } from "@/components/ad_editor";
import { IdInput } from "@/gql/graphql";
import { capitalize } from "@/utils/format";
import { notifyError } from "@/utils/notify";

type Data = {
  id: IdInput["id"];
  name: string;
};

type EditorProps<T extends Data[]> = {
  label: string;
  data: T;
  validationSchema: z.Schema;
  onAdd: (newId: string) => Promise<void>;
};

export function Editor<T extends Data[]>({
  label,
  data,
  validationSchema,
  onAdd,
}: EditorProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const focusInput = () => {
    if (!formRef.current) return;
    const target = formRef.current.elements.namedItem(label);
    if (target instanceof HTMLElement) target.focus();
  };
  const alreadyExists = (name: string) => {
    return data.some((el) => el.name === name.trim().toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setName(e.target.value);
  };
  const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
    try {
      setErrors([]);
      validationSchema.parse({ name });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const { name: zodErrors = [] } = error.formErrors.fieldErrors;
        setErrors(zodErrors);
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
      if (errors.length > 0) {
        focusInput();
        return;
      }
      // Check for already existing name.
      if (alreadyExists(name)) {
        focusInput();
        setErrors((prev) => [...prev, `${capitalize(label)} already exists!`]);
        return;
      }
      // Add new name to database and update parent form current selection.
      await onAdd(name);
      // Reset form.
      setName("");
    } catch (error: unknown) {
      console.error(error);
      notifyError(
        `Oops... an error has occured. ${capitalize(label)} could not be added! Please try again later.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InputField
        label={label}
        placeholder={`Enter a new ${label} name...`}
        value={name}
        disabled={submitting}
        errors={errors}
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
