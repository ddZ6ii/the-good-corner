import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { ZodError } from "zod";
import { ApolloError, useMutation } from "@apollo/client";
import { Button } from "@/common/Button";
import { NavLink } from "@/common/Link";
import { SIGN_UP } from "@/graphql/signUp";
import PageContent from "@/layouts/PageContent";
import { SignUpSchema } from "@/schemas/signForm.validation";
import { theme } from "@/themes/theme";
import { getOjectKeys } from "@/types/utils.types";
import { formatFormErrors, mapZodError } from "@/utils/formatErrors";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormError = Record<keyof FormData, string[]>;

type FormState = {
  data: FormData;
  status: "typing" | "submitting" | "success" | "error";
  error: FormError;
};

const initialFormState: FormState = {
  data: {
    email: "test@email.com",
    password: "My-Super-Password-123",
    confirmPassword: "My-Super-Password-123",
  },
  status: "typing",
  error: {
    email: [],
    password: [],
    confirmPassword: [],
  },
};

export default function SignUpPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [serverError, setServerError] = useState("");
  const [signUp] = useMutation(SIGN_UP);
  const formRef = useRef<HTMLFormElement>(null);

  const hasFieldError = (fieldName: keyof FormData): boolean =>
    !!formState.error[fieldName].length;

  const focusFirstFieldWithError = (error: FormError): void => {
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
    setFormState((prevState) => ({
      data: { ...formState.data, [name]: value },
      status: "typing",
      error: { ...prevState.error, [name]: [] },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Reset form error and status state
      setFormState((prevState) => ({
        ...prevState,
        status: "submitting",
        error: initialFormState.error,
      }));
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
      setFormState((prevState) => ({
        ...prevState,
        data: initialFormState.data,
        status: "success",
      }));
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = mapZodError(error, formState.error);
        setFormState((prevState) => ({
          ...prevState,
          error: nextFormError,
        }));
      }
      if (error instanceof ApolloError) {
        if (error.message.toLowerCase().includes("already exists")) {
          setServerError("An account with this email already exists.");
        }
      }
      setFormState((prevState) => ({
        ...prevState,
        status: "error",
      }));
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
  }, [formState.status, formState.error]);

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
      <form
        action=""
        noValidate
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ display: "grid", justifyItems: "center", gap: "1rem" }}
      >
        {serverError && <p style={{ color: "red" }}>{serverError}</p>}

        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
          <label htmlFor="email">Email*</label>
          <input
            autoFocus
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={formState.data.email}
            onChange={handleChange}
            disabled={formState.status === "submitting"}
          />
          {hasFieldError("email") && (
            <p style={{ color: "red" }}>{formState.error.email[0]}</p>
          )}
        </div>

        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            value={formState.data.password}
            onChange={handleChange}
            disabled={formState.status === "submitting"}
          />
          {hasFieldError("password") && (
            <ul style={{ color: "red" }}>
              {formatFormErrors(formState.error, "password").slice(0, 1)}
              {formatFormErrors(formState.error, "password")
                .slice(1)
                .map((error) => (
                  <li key={error}>{error}</li>
                ))}
            </ul>
          )}
        </div>

        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
          <label htmlFor="confirm-password">Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            autoComplete="new-password"
            value={formState.data.confirmPassword}
            onChange={handleChange}
            disabled={formState.status === "submitting"}
          />
          {hasFieldError("confirmPassword") && (
            <p style={{ color: "red" }}>{formState.error.confirmPassword[0]}</p>
          )}
        </div>
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
      </form>
    </PageContent>
  );
}

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
