import styled from "styled-components";
import { useEffect, useReducer, useRef, useState } from "react";
import { ZodError } from "zod";
import { ApolloError, useMutation } from "@apollo/client";
import { Button } from "@/common/Button";
import { NavLink } from "@/common/Link";
import { Form as BaseForm, InputField } from "@/components/form";
import { SIGN_UP } from "@/graphql/signUp";
import PageContent from "@/layouts/PageContent";
import {
  signUpFormReducer,
  initialFormState,
} from "@/reducers/signUpForm.reducer";
import { SignUpSchema } from "@/schemas/signForm.validation";
import { theme } from "@/themes/theme";
import { SignUpFormError } from "@/types/signUpForm.types";
import { getOjectKeys } from "@/types/utils.types";
import { mapZodError } from "@/utils/formatErrors";

export default function SignUpPage() {
  const [formState, dispatch] = useReducer(signUpFormReducer, initialFormState);
  const [serverError, setServerError] = useState("");
  const [signUp] = useMutation(SIGN_UP);
  const formRef = useRef<HTMLFormElement>(null);

  const focusFirstFieldWithError = (error: SignUpFormError): void => {
    const keys = getOjectKeys(error);
    const firstInputWithError = keys.find((key) => error[key].length > 0);
    if (!formRef.current || !firstInputWithError) return;
    const shouldFocusOnPassword = firstInputWithError === "confirmPassword";
    const target = formRef.current.elements.namedItem(
      shouldFocusOnPassword ? "password" : firstInputWithError,
    );
    if (target instanceof HTMLElement) target.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "update_input", payload: { name, nextValue: value } });
    dispatch({ type: "update_error", payload: { name, nextError: [] } });
    dispatch({ type: "update_status", payload: { nextStatus: "typing" } });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: "reset_form_error" });
      dispatch({
        type: "update_status",
        payload: { nextStatus: "submitting" },
      });
      setServerError("");

      const parsedBody = SignUpSchema.parse(formState.data);

      const { confirmPassword: _, ...userData } = parsedBody;
      const { data, errors } = await signUp({
        variables: { data: userData },
      });
      if (errors !== undefined || !data?.createUser) {
        if (errors) console.error("Failed to sign up:", errors);
        throw new Error("Failed to sign up!");
      }
      dispatch({
        type: "update_status",
        payload: { nextStatus: "success" },
      });
      dispatch({
        type: "reset_form_data",
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, formState.error);
        dispatch({ type: "validate_form", payload: { nextFormError } });
      }
      if (error instanceof ApolloError) {
        if (error.message.toLowerCase().includes("already exists")) {
          setServerError("An account with this email already exists.");
        }
      }
      dispatch({ type: "update_status", payload: { nextStatus: "error" } });
    }
  };

  useEffect(() => {
    if (formState.status !== "error") return;

    const hasFormError = getOjectKeys(formState.error).some(
      (key) => formState.error[key].length > 0,
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

  if (formState.status === "success") {
    return (
      <PageContent title="Thank you!">
        <div>
          <h3>Your account has successfully been created 🎉</h3>
          <br />
          <p>
            To take fully enjoy your experience, please verify your email and
            make sure to activate your account. The link in the email will
            expire in 24 hours.
          </p>
          <br />
          <p>
            <NavLink to="/signin" color="secondary">
              Sign In
            </NavLink>
            to start using our services.
          </p>
        </div>
      </PageContent>
    );
  }

  return (
    <PageContent title="Sign Up">
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
        <InputField
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          value={formState.data.confirmPassword}
          disabled={formState.status === "submitting"}
          errors={formState.error.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          color="primary"
          disabled={formState.status === "submitting"}
        >
          Sign Up
        </Button>
        <Text>
          Already have an account? <NavLink to="/signin">Sign In</NavLink>
        </Text>
      </Form>
    </PageContent>
  );
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
