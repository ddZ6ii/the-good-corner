import {
  SignUpFormAction,
  SignUpFormData,
  SignUpFormError,
  SignUpFormState,
} from "@/types/signUpForm.types";

/** Test config.
 * ----------------------
const initialFormData: SignUpFormData = {
  email: "test@email.com",
  password: "My-Super-Password-123",
  confirmPassword: "My-Super-Password-123",
};
 */

// const initialFormData: SignUpFormData = {
//   email: "",
//   password: "",
//   confirmPassword: "",
// };
const initialFormData: SignUpFormData = {
  email: "test@email.com",
  password: "My-Super-Password-123",
  confirmPassword: "My-Super-Password-123",
};

const initialFormError: SignUpFormError = {
  email: [],
  password: [],
  confirmPassword: [],
};

export const initialFormState: SignUpFormState = {
  data: initialFormData,
  error: initialFormError,
  status: "typing",
};

export function signUpFormReducer(
  formState: SignUpFormState = initialFormState,
  action: SignUpFormAction,
): SignUpFormState {
  switch (action.type) {
    case "update_input": {
      const { name, nextValue } = action.payload;
      const nextData = { ...formState.data, [name]: nextValue };
      return {
        ...formState,
        data: nextData,
      };
    }

    case "update_error": {
      const { name, nextError } = action.payload;
      const nextFormError = { ...formState.error, [name]: nextError };
      return {
        ...formState,
        error: nextFormError,
      };
    }

    case "update_status": {
      const { nextStatus } = action.payload;
      return { ...formState, status: nextStatus };
    }

    case "validate_form": {
      const { nextFormError } = action.payload;
      return {
        ...formState,
        error: { ...formState.error, ...nextFormError },
      };
    }

    case "reset_form_data": {
      return { ...formState, data: initialFormData };
    }

    case "reset_form_error": {
      return { ...formState, error: initialFormError };
    }

    case "reset_form_state": {
      return { ...initialFormState };
    }
  }
}
