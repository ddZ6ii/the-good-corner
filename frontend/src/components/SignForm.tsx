import styled from "styled-components";
import {
  ChangeEvent,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ZodError } from "zod";
import { ApolloError } from "@apollo/client";
import { Button } from "@/common/Button";
import { NavLink } from "@/common/Link";
import { Form as BaseForm, InputField } from "@/components/form";
import { signFormReducer } from "@/reducers/signForm.reducer";
import { theme } from "@/themes/theme";
import {
  SignFormData,
  SignFormError,
  SignFormState,
  SignInFormData,
  SignUpFormData,
} from "@/types/signForm.types";
import { getOjectKeys } from "@/types/utils.types";
import { mapZodError } from "@/utils/formatErrors";

type Sign = "signIn" | "signUp";

interface CommonProps {
  type: Sign;
}

interface SignInProps extends CommonProps {
  type: "signIn";
  initialFormData: SignInFormData;
  onSubmit: (formData: SignInFormData) => Promise<void>;
}

interface SignUpProps extends CommonProps {
  type: "signUp";
  initialFormData: SignUpFormData;
  onSignUpSuccessComponent: ReactNode;
  onSubmit: (formData: SignUpFormData) => Promise<void>;
}

type SignFormProps = SignInProps | SignUpProps;

export default function SignForm(props: SignFormProps) {
  const { type, initialFormData, onSubmit } = props;
  const signUp = type === "signUp";
  const onSignUpSuccessComponent = signUp
    ? props.onSignUpSuccessComponent
    : null;

  const initialFormState: SignFormState = {
    data: initialFormData,
    error: initFormErrors(initialFormData),
    status: "typing",
  };

  const [formState, dispatch] = useReducer(signFormReducer, initialFormState);
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const focusFirstFieldWithError = (error: SignFormState["error"]): void => {
    const keys = getOjectKeys(error);
    const firstInputWithError = keys.find(
      (key) => error[key] && error[key].length > 0,
    );
    if (!formRef.current || !firstInputWithError) return;
    const shouldFocusOnPassword = firstInputWithError === "confirmPassword";
    const target = formRef.current.elements.namedItem(
      shouldFocusOnPassword ? "password" : firstInputWithError,
    );
    if (target instanceof HTMLElement) target.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "update_input", payload: { name, nextValue: value } });
    dispatch({ type: "update_error", payload: { name, nextError: [] } });
    dispatch({ type: "update_status", payload: { nextStatus: "typing" } });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({
        type: "reset_form_error",
        payload: { initialFormError: initFormErrors(initialFormData) },
      });
      dispatch({
        type: "update_status",
        payload: { nextStatus: "submitting" },
      });
      setServerError("");

      await onSubmit({
        ...formState.data,
        confirmPassword: formState.data.confirmPassword ?? "",
      });

      dispatch({
        type: "update_status",
        payload: { nextStatus: "success" },
      });
      dispatch({
        type: "reset_form_data",
        payload: { initialFormData },
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, {
          ...formState.error,
          confirmPassword: formState.error.confirmPassword ?? [],
        });
        dispatch({ type: "validate_form", payload: { nextFormError } });
      } else if (error instanceof ApolloError) {
        if (error.message.toLowerCase().includes("already exists")) {
          setServerError("An account with this email already exists");
        }
      } else {
        setServerError("Invalid credentials");
      }
      dispatch({ type: "update_status", payload: { nextStatus: "error" } });
    }
  };

  useEffect(() => {
    if (formState.status !== "error") return;

    const hasFormError = getOjectKeys(formState.error).some(
      (key) => formState.error[key] && formState.error[key].length > 0,
    );
    if (hasFormError) {
      focusFirstFieldWithError(formState.error);
      return;
    }
    if (serverError) {
      if (!formRef.current) return;
      const target = formRef.current.elements.namedItem("email");
      if (target instanceof HTMLElement) target.focus();
    }
  }, [formState.status, formState.error, serverError]);

  if (signUp && formState.status === "success") {
    return <>{onSignUpSuccessComponent}</>;
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit} noValidate>
      {serverError && <ErrorText>{serverError}</ErrorText>}
      <InputField
        type="email"
        label="Email"
        placeholder="Your email address"
        autoComplete="email"
        value={formState.data.email}
        disabled={formState.status === "submitting"}
        errors={formState.error.email}
        onChange={handleChange}
        autoFocus
        required
      />
      <InputField
        type="password"
        label="Password"
        placeholder="Your password"
        autoComplete="new-password"
        value={formState.data.password}
        disabled={formState.status === "submitting"}
        errors={formState.error.password}
        onChange={handleChange}
        required
      />
      {signUp && (
        <InputField
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          value={formState.data.confirmPassword ?? ""}
          disabled={formState.status === "submitting"}
          errors={formState.error.confirmPassword ?? []}
          onChange={handleChange}
          required
        />
      )}
      <Button
        type="submit"
        color="primary"
        disabled={formState.status === "submitting"}
      >
        Sign {signUp ? "Up" : "In"}
      </Button>
      <Text>
        {signUp ? "Already" : "Don't"} have an account?
        <NavLink to={signUp ? "/signin" : "/signup"} color="secondary">
          Sign {signUp ? "In" : "Up"}
        </NavLink>
      </Text>
    </Form>
  );
}

function initFormErrors(initialFormData: SignFormData): SignFormState["error"] {
  const keys = getOjectKeys(initialFormData);
  const errors = keys.reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    {} as SignFormError<SignFormData>,
  );
  if (!("confirmPassword" in errors)) {
    errors.confirmPassword = [];
  }
  return errors;
}

const Form = styled(BaseForm)`
  width: min(100%, 340px);
`;

const ErrorText = styled.p`
  color: ${theme.color.status.danger};
  font-size: 12px;
`;

const Text = styled.p`
  color: ${theme.color.neutral.light};
  font-size: 12px;
  & a {
    color: ${theme.color.secondary.main};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:visited {
      color: ${theme.color.secondary.main};
    }
    &:is(:hover, :focus-visible) {
      color: ${theme.color.secondary.dark};
      text-decoration: underline;
      outline: none;
    }
    &:active {
      color: ${theme.color.primary.main};
    }
  }
`;
