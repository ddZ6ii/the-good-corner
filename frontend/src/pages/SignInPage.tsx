import styled from "styled-components";
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { useMutation } from "@apollo/client";
import { Button } from "@/common/Button";
import { NavLink } from "@/common/Link";
import { Form as BaseForm } from "@/components/form";
import { InputField } from "@/components/form";
import { LOG_IN } from "@/graphql/logIn";
import { WHO_AM_I } from "@/graphql/whoAmI";
import PageContent from "@/layouts/PageContent";
import {
  initialFormState,
  signInFormReducer,
} from "@/reducers/signInForm.reducer";
import { SignInSchema } from "@/schemas/signForm.validation";
import { theme } from "@/themes/theme";
import { SignInFormError } from "@/types/signInForm.types";
import { getOjectKeys } from "@/types/utils.types";
import { mapZodError } from "@/utils/formatErrors";
import { notifySuccess } from "@/utils/notify";

export default function SignInPage() {
  const [formState, dispatch] = useReducer(signInFormReducer, initialFormState);
  const [serverError, setServerError] = useState("");
  const [logIn] = useMutation(LOG_IN);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const focusFirstFieldWithError = (error: SignInFormError): void => {
    const keys = getOjectKeys(error);
    const firstInputWithError = keys.find((key) => error[key].length > 0);
    if (!formRef.current || !firstInputWithError) return;
    const target = formRef.current.elements.namedItem(firstInputWithError);
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

      const parsedBody = SignInSchema.parse(formState.data);

      const { data, errors } = await logIn({
        variables: { data: parsedBody },
        refetchQueries: [{ query: WHO_AM_I }],
      });
      if (errors !== undefined || !data?.logInUser) {
        console.error("Failed to sign in:", errors);
        throw new Error("Failed to sign in!");
      }
      dispatch({
        type: "update_status",
        payload: { nextStatus: "success" },
      });
      dispatch({
        type: "reset_form_data",
      });
      notifySuccess("Glad to have you back 👋");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, formState.error);
        dispatch({ type: "validate_form", payload: { nextFormError } });
      } else {
        setServerError("Invalid credentials");
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

  return (
    <PageContent title="Sign In">
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
          autoComplete="current-password"
          value={formState.data.password}
          disabled={formState.status === "submitting"}
          errors={formState.error.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          color="primary"
          disabled={formState.status === "submitting"}
        >
          Sign In
        </Button>

        <Text>
          Don&apos;t have an account?{" "}
          <NavLink to="/signup" color="secondary">
            Sign Up
          </NavLink>
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
