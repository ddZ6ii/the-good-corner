import { ZodError } from "zod";
import { AdContentSchema } from "@/schemas/ad.validation";
import {
  AdFormAction,
  AdFormData,
  AdFormError,
  AdFormState,
} from "@/types/adForm.types";
import { mapZodError } from "@/utils/formatErrors";

/** Test config.
 * ----------------------
const initialFormData: AdFormData = {
  title: "this is a title",
  owner: "myemail@gmail.com",
  price: 199,
  picture:
    "https://static1.squarespace.com/static/56acc1138a65e2a286012c54/56ad05dfb09f9505c22897ef/5756ca76d51cd46816d2aa74/1613662125137/pixabaytest6-7.jpg?format=1500w",
  description: "this is a very long description...",
  location: "petaouchnok",
  category: {id: 1},
  tags: [{ id: 1 }, { id: 3 }],
};
 */

const initialFormData: AdFormData = {
  title: "",
  owner: "",
  price: 0,
  picture: "",
  description: "",
  location: "",
  category: undefined,
  tags: [],
};

const initialFormError: AdFormError = {
  title: "",
  description: "",
  owner: "",
  price: "",
  picture: "",
  location: "",
  category: "",
  tags: "",
};

export const initialFormState: AdFormState = {
  data: initialFormData,
  error: initialFormError,
  isSubmitting: false,
};

export function adFormReducer(
  formState: AdFormState = initialFormState,
  action: AdFormAction,
): AdFormState {
  switch (action.type) {
    case "update_input": {
      const { name, nextValue, checked } = action.payload;

      // Clear current field error (if any).
      const nextFormError = { ...formState.error, [name]: "" };

      // Update state from current field value.
      let nextStateValue = nextValue;
      if (checked !== undefined && typeof nextValue === "number") {
        const isChecked = formState.data.tags.some(
          (tag) => tag.id === nextValue.toString(),
        );
        nextStateValue = isChecked
          ? formState.data.tags.filter((tag) => tag.id !== nextValue.toString())
          : [...formState.data.tags, { id: nextValue.toString() }];
      }
      return {
        ...formState,
        data: { ...formState.data, [name]: nextStateValue },
        error: nextFormError,
      };
    }

    case "update_submit_status": {
      return { ...formState, isSubmitting: action.payload.isSubmitting };
    }

    case "validate_field": {
      try {
        const { name, nextValue } = action.payload;
        AdContentSchema.partial().parse({
          [name]: nextValue,
        });
        return { ...formState };
      } catch (error) {
        if (error instanceof ZodError) {
          const nextFormError = mapZodError(error, { ...formState.error });
          return { ...formState, error: nextFormError };
        }
        return { ...formState };
      }
    }

    case "validate_form": {
      return {
        ...formState,
        error: { ...formState.error, ...action.payload.nextFormError },
      };
    }

    case "reset_form_error": {
      return { ...formState, error: initialFormError };
    }

    case "reset_form_state": {
      return { ...initialFormState };
    }
  }
}
