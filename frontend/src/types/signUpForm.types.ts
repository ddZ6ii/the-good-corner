export type SignFormStatus = "typing" | "submitting" | "success" | "error";

export type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormError<T> = {
  [K in keyof T]: string[];
};

export type SignUpFormError = FormError<SignUpFormData>;

export type SignUpFormState = {
  data: SignUpFormData;
  error: SignUpFormError;
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
    nextFormError: SignUpFormState["error"];
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

export type SignUpFormAction =
  | UpdateInput
  | UpdateError
  | UpdateStatus
  | ValidateForm
  | ResetFormData
  | ResetFormError
  | ResetFormState;
