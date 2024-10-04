import { Id } from "@tgc/common";

export type AdFormData = {
  title: string;
  owner: string;
  price: number;
  picture: string;
  description: string;
  location: string;
  category: Id | undefined;
  tags: Id[];
};

export type AdFormError = {
  // Type mapping (retrieve dynamically all keys from AdFormData) to avoid code duplication.
  [K in keyof AdFormData]: string;
};

export type AdFormState = {
  data: AdFormData;
  error: AdFormError;
  isSubmitting: boolean;
};

type Action =
  | "update_input"
  | "update_submit_status"
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
    nextValue: string | number | Id | Id[];
    checked?: boolean;
  };
}

interface UpdateSubmitStatus extends ActionType {
  type: "update_submit_status";
  payload: {
    isSubmitting: boolean;
  };
}

interface ValidateField extends ActionType {
  type: "validate_field";
  payload: {
    name: string;
    nextValue: string | number | Id;
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
  | UpdateSubmitStatus
  | ResetFormError
  | ResetFormState;
