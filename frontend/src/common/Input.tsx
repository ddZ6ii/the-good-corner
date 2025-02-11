import styled from 'styled-components'
import { theme } from '@/themes'

export const Input = styled.input`
  padding: 8px;
  height: 40px;
  width: 100%;
  min-width: 120px;
  max-width: 360px;
  flex-grow: 1;
  background-color: ${theme.color.white};
  border: ${theme.borderRadius.rounded_sm} solid ${theme.color.neutral.lightest};
  border-radius: ${theme.borderRadius.rounded_lg};
  font-family: inherit;
  font-size: 12px;
`
