import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { ApolloError, useMutation } from "@apollo/client";
import { Button } from "@/common/Button";
import { NavLink } from "@/common/Link";
import { LOG_IN } from "@/graphql/logIn";
import { WHO_AM_I } from "@/graphql/whoAmI";
import PageContent from "@/layouts/PageContent";
import { SignInSchema } from "@/schemas/signForm.validation";
import { theme } from "@/themes/theme";
import { getOjectKeys } from "@/types/utils.types";
import { mapZodError } from "@/utils/formatErrors";
import { notifySuccess } from "@/utils/notify";

type FormData = {
  email: string;
  password: string;
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
  },
  status: "typing",
  error: {
    email: [],
    password: [],
  },
};

export default function SignInPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [serverError, setServerError] = useState("");
  const [logIn] = useMutation(LOG_IN);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const hasFieldError = (fieldName: keyof FormData): boolean =>
    !!formState.error[fieldName].length;

  const focusFirstFieldWithError = (error: FormError): void => {
    const keys = getOjectKeys(error);
    const firstInputWithError = keys.find((key) => error[key].length > 0);
    if (!formRef.current || !firstInputWithError) return;
    const target = formRef.current.elements.namedItem(firstInputWithError);
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

      const parsedBody = SignInSchema.parse(formState.data);

      const { data, errors } = await logIn({
        variables: { data: parsedBody },
        refetchQueries: [{ query: WHO_AM_I }],
      });
      if (errors !== undefined || !data?.logInUser) {
        console.error("Failed to sign in:", errors);
        throw new Error("Failed to sign in!");
      }
      setFormState((prevState) => ({
        ...prevState,
        data: initialFormState.data,
        status: "success",
      }));
      notifySuccess("Glad to have you back 👋");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.log("ZodError");
        const nextFormError = mapZodError(error, formState.error);
        setFormState((prevState) => ({
          ...prevState,
          error: nextFormError,
          status: "error",
        }));
        return;
      }
      if (error instanceof ApolloError || error instanceof Error) {
        console.log("Apollo Error or Error");
        setServerError("Invalid credentials.");
        setFormState((prevState) => ({
          ...prevState,
          status: "error",
        }));
        return;
      }
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
            autoComplete="current-password"
            value={formState.data.password}
            onChange={handleChange}
            disabled={formState.status === "submitting"}
          />
          {hasFieldError("password") && (
            <p style={{ color: "red" }}>{formState.error.password[0]}</p>
          )}
        </div>

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
