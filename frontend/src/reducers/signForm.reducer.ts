import { SignFormAction, SignFormState } from '@/types'

export default function signFormReducer(
  formState: SignFormState,
  action: SignFormAction,
): SignFormState {
  switch (action.type) {
    case 'update_input': {
      const { name, nextValue } = action.payload
      const nextData = { ...formState.data, [name]: nextValue }
      return {
        ...formState,
        data: nextData,
      }
    }

    case 'update_error': {
      const { name, nextError } = action.payload
      const nextFormError = { ...formState.error, [name]: nextError }
      return {
        ...formState,
        error: nextFormError,
      }
    }

    case 'update_status': {
      const { nextStatus } = action.payload
      return { ...formState, status: nextStatus }
    }

    case 'validate_form': {
      const { nextFormError } = action.payload
      return {
        ...formState,
        error: { ...formState.error, ...nextFormError },
      }
    }

    case 'reset_form_data': {
      const { initialFormData } = action.payload
      return { ...formState, data: initialFormData }
    }

    case 'reset_form_error': {
      const { initialFormError } = action.payload
      return { ...formState, error: initialFormError }
    }

    case 'reset_form_state': {
      const { initialFormData, initialFormError, initialFormStatus } =
        action.payload

      return {
        data: initialFormData,
        error: initialFormError,
        status: initialFormStatus,
      }
    }
  }
}
