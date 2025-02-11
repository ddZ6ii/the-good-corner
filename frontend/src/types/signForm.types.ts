import { Optional } from '@/types'

export type SignInFormData = {
  email: string
  password: string
}

export type SignUpFormData = SignInFormData & {
  confirmPassword: string
}

export type SignFormData = Optional<SignUpFormData, 'confirmPassword'>

export type SignFormError<T extends SignFormData> = {
  [K in keyof T]: string[]
}

export type SignFormStatus = 'typing' | 'submitting' | 'success' | 'error'

export type SignFormState = {
  data: SignFormData
  error: SignFormError<SignFormData>
  status: SignFormStatus
}

type Action =
  | 'update_input'
  | 'update_error'
  | 'update_status'
  | 'validate_form'
  | 'reset_form_data'
  | 'reset_form_error'
  | 'reset_form_state'

interface ActionType {
  type: Action
}

interface UpdateInput extends ActionType {
  type: 'update_input'
  payload: {
    name: string
    nextValue: string
  }
}

interface UpdateStatus extends ActionType {
  type: 'update_status'
  payload: {
    nextStatus: SignFormStatus
  }
}

interface UpdateError extends ActionType {
  type: 'update_error'
  payload: {
    name: string
    nextError: string[]
  }
}

interface ValidateForm extends ActionType {
  type: 'validate_form'
  payload: {
    nextFormError: SignFormError<SignFormData>
  }
}

interface ResetFormData extends ActionType {
  type: 'reset_form_data'
  payload: {
    initialFormData: SignFormData
  }
}

interface ResetFormError extends ActionType {
  type: 'reset_form_error'
  payload: {
    initialFormError: SignFormError<SignFormData>
  }
}

interface ResetFormState extends ActionType {
  type: 'reset_form_state'
  payload: {
    initialFormData: SignFormData
    initialFormError: SignFormError<SignFormData>
    initialFormStatus: SignFormStatus
  }
}

export type SignFormAction =
  | UpdateInput
  | UpdateError
  | UpdateStatus
  | ValidateForm
  | ResetFormData
  | ResetFormError
  | ResetFormState
