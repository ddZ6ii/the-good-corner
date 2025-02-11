import styled, { css } from 'styled-components'
import { HTMLProps } from 'react'
import { Label, Field, Info, Text } from '@/components/form'
import { baseInputStyle } from '@/styles'
import { theme } from '@/themes'
import { capitalize, toCamelCase } from '@/utils'

interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  label: string
  value: string
  errors: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export default function InputField({
  label,
  value,
  errors,
  onChange,
  onBlur,
  ...restProps
}: InputFieldProps) {
  const formatErrorMessage = () => {
    const inputType = restProps.type ?? 'text'
    const shouldDisplayErrorsAsList =
      inputType === 'password' &&
      label.toLowerCase() === 'password' &&
      errors.length > 1
    if (shouldDisplayErrorsAsList) {
      return (
        <ErrorList>
          Your password does not meet password policy requirements:
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ErrorList>
      )
    }
    return <Text>{errors.join('. ')}</Text>
  }
  return (
    <Field>
      <Label htmlFor={restProps.name ?? label.toLowerCase()}>
        {capitalize(label)} {restProps.required && <Info>*</Info>}
      </Label>
      <Input
        type={restProps.type ?? 'text'}
        name={toCamelCase(restProps.name ?? label)}
        id={toCamelCase(restProps.name ?? label)}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...restProps}
      />
      {errors.length > 0 && formatErrorMessage()}
    </Field>
  )
}

export const Input = styled.input`
  ${baseInputStyle}
  ${({ type }) =>
    type === 'checkbox' &&
    css`
      cursor: pointer;
    `}
  &[disabled] {
    cursor: not-allowed;
  }
`

const ErrorList = styled.ul`
  color: ${theme.color.status.danger};
  font-size: 12px;
  list-style-type: circle;
  list-style-position: inside;
`
