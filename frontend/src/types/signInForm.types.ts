export type SignFormStatus = "typing" | "submitting" | "success" | "error";

export type SignInFormData = {
  email: string;
  password: string;
};

type FormError<T> = {
  [K in keyof T]: string[];
};

export type SignInFormError = FormError<SignInFormData>;

export type SignInFormState = {
  data: SignInFormData;
  error: SignInFormError;
  status: SignFormStatus;
};

type Action =
  | "update_input"
  | "update_error"
  | "update_status"
  | "validate_form"
  | "reset_form_data"
  | "reset_form_error"
  | "reset_form_state";

interface ActionType {
  type: Action;
}

interface UpdateInput extends ActionType {
  type: "update_input";
  payload: {
    name: string;
    nextValue: string;
  };
}

interface UpdateStatus extends ActionType {
  type: "update_status";
  payload: {
    nextStatus: SignFormStatus;
  };
}

interface UpdateError extends ActionType {
  type: "update_error";
  payload: {
    name: string;
    nextError: string[];
  };
}

interface ValidateForm extends ActionType {
  type: "validate_form";
  payload: {
    nextFormError: SignInFormState["error"];
  };
}

interface ResetFormData extends ActionType {
  type: "reset_form_data";
}

interface ResetFormError extends ActionType {
  type: "reset_form_error";
}

interface ResetFormState extends ActionType {
  type: "reset_form_state";
}

export type SignInFormAction =
  | UpdateInput
  | UpdateError
  | UpdateStatus
  | ValidateForm
  | ResetFormData
  | ResetFormError
  | ResetFormState;
