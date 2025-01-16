import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@/common/Button";
import { LOG_IN } from "@/graphql/logIn";
import { WHO_AM_I } from "@/graphql/whoAmI";
import PageContent from "@/layouts/PageContent";

type FormState = {
  data: {
    email: string;
    password: string;
  };
  status: "typing" | "submitting" | "error" | "success";
  error: string;
};

const initialFormState: FormState = {
  data: {
    email: "test@email.com",
    password: "My-Super-Password-123",
  },
  status: "typing",
  error: "",
};

export default function SignInPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [logIn] = useMutation(LOG_IN);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nexState = {
      ...formState,
      data: { ...formState.data, [name]: value },
    };
    setFormState(nexState);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    console.log(`validate ${name} input data...`);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Reset form error and status state
      setFormState((prev) => ({ ...prev, status: "submitting", error: "" }));
      // !TODO: validate form data...
      console.log("validate form data...");
      console.log("submitting...");
      const { data, errors } = await logIn({
        variables: { data: formState.data },
        refetchQueries: [{ query: WHO_AM_I }],
      });
      if (errors !== undefined || !data?.logInUser) {
        if (errors) console.error("Failed to sign in:", errors);
        throw new Error("Failed to sign in!");
      }
      const { id: userId } = data.logInUser;
      console.log("User signed in with id:", userId);
      setFormState((prev) => ({
        ...prev,
        data: initialFormState.data,
        status: "success",
      }));
      // !TODO: display login notification (Hello ${name}... 👋)...
      navigate("/", { replace: true });
    } catch (error: unknown) {
      console.error(error);
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += JSON.stringify(error);
      }
      setFormState({
        ...formState,
        status: "error",
        error: errorMessage,
      });
    }
  };

  return (
    <PageContent title="Sign In">
      <form
        action=""
        onSubmit={handleSubmit}
        autoComplete="on"
        style={{ display: "grid", justifyItems: "center", gap: "1rem" }}
      >
        {formState.error && <p style={{ color: "red" }}>{formState.error}</p>}

        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formState.data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={formState.status === "submitting"}
          />
        </div>

        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formState.data.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={formState.status === "submitting"}
          />
        </div>
        <Button type="submit" disabled={formState.status === "submitting"}>
          Sign In
        </Button>
      </form>
    </PageContent>
  );
}
