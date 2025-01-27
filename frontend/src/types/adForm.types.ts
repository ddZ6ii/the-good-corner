import { IdInput } from "@/gql/graphql";

export type AdFormData = {
  title: string;
  owner: string;
  price: number;
  picture: string;
  description: string;
  location: string;
  category: IdInput | undefined;
  tags: IdInput[];
};

export type AdFormError = {
  // Type mapping (retrieve dynamically all keys from AdFormData) to avoid code duplication.
  [K in keyof AdFormData]: string[];
};

export type AdFormStatus = "typing" | "submitting" | "error" | "success";

export type AdFormState = {
  data: AdFormData;
  error: AdFormError;
  status: AdFormStatus;
};

type Action =
  | "update_input"
  | "update_status"
  | "validate_field"
  | "validate_form"
  | "reset_form_error"
  | "reset_form_state";

interface ActionType {
  type: Action;
}

interface UpdateInput extends ActionType {
  type: "update_input";
  payload: {
    name: string;
    nextValue: string | number | IdInput | IdInput[];
    checked?: boolean;
  };
}

interface UpdateStatus extends ActionType {
  type: "update_status";
  payload: {
    nextStatus: AdFormStatus;
  };
}

interface ValidateField extends ActionType {
  type: "validate_field";
  payload: {
    name: string;
    nextValue: string | number | IdInput;
  };
}

interface ValidateForm extends ActionType {
  type: "validate_form";
  payload: {
    nextFormError: AdFormError;
  };
}

interface ResetFormError extends ActionType {
  type: "reset_form_error";
}

interface ResetFormState extends ActionType {
  type: "reset_form_state";
}

export type AdFormAction =
  | UpdateInput
  | ValidateField
  | ValidateForm
  | UpdateStatus
  | ResetFormError
  | ResetFormState;
