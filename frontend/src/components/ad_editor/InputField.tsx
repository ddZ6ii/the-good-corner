import styled, { css } from "styled-components";
import { HTMLProps } from "react";
import { Label, Field, Info, Text } from "@/components/ad_editor";
import { baseInputStyle } from "@/themes/styles";
import { capitalize } from "@/utils/format";

interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  label: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  value,
  error,
  onChange,
  onBlur,
  ...restProps
}: InputFieldProps) {
  return (
    <Field>
      <Label htmlFor={restProps.name ?? label.toLowerCase()}>
        {capitalize(label)} {restProps.required && <Info>*</Info>}
      </Label>
      <Input
        type={restProps.type ?? "text"}
        name={label.toLowerCase()}
        id={restProps.name ?? label.toLowerCase()}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...restProps}
      />
      {error && <Text>{error}</Text>}
    </Field>
  );
}

export const Input = styled.input`
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
