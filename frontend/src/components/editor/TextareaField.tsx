import { HTMLProps } from "react";
import { Label, Field, Info, Text, TextArea } from "@/components/editor";
import { capitalize } from "@/utils/format";

interface TextareaFieldProps extends HTMLProps<HTMLTextAreaElement> {
  label: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export default function TextareaField({
  label,
  value,
  error,
  onChange,
  onBlur,
  ...restProps
}: TextareaFieldProps) {
  return (
    <Field>
      <Label htmlFor={label.toLowerCase()}>
        {capitalize(label)} {restProps.required && <Info>*</Info>}
      </Label>
      <TextArea
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        rows={10}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...restProps}
      />
      {error && <Text>{error}</Text>}
    </Field>
  );
}
