import { useState } from "react";
import { useMutation } from "@apollo/client";
import { NavLink } from "@/common/Link";
import SignForm from "@/components/SignForm";
import { SIGN_UP } from "@/graphql/signUp";
import PageContent from "@/layouts/PageContent";
import { SignUpSchema } from "@/schemas/signForm.validation";
import { SignUpFormData } from "@/types/signForm.types";

/** Test config.
 * ----------------------
const initialFormData = {
  email: "test@email.com",
  password: "My-Super-Password-123",
  confirmPassword: "My-Super-Password-123",
};
 */

const initialFormData: SignUpFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpPage() {
  const [title, setTitle] = useState("Sign In");
  const [signUp] = useMutation(SIGN_UP);

  const signUpUser = async (formData: SignUpFormData) => {
    const parsedBody = SignUpSchema.parse(formData);
    const { confirmPassword: _, ...userData } = parsedBody;

    const { data, errors } = await signUp({
      variables: { data: userData },
    });
    if (errors !== undefined || !data?.createUser) {
      if (errors) console.error("Failed to sign up:", errors);
      throw new Error("Failed to sign up!");
    }
    setTitle("Thank you!");
  };

  return (
    <PageContent title={title}>
      <SignForm
        type="signUp"
        initialFormData={initialFormData}
        onSubmit={signUpUser}
        onSignUpSuccessComponent={<AccountCreationConfimation />}
      />
    </PageContent>
  );
}

function AccountCreationConfimation() {
  return (
    <div>
      <h3>Your account has successfully been created 🎉</h3>
      <br />
      <p>
        To take fully enjoy your experience, please verify your email and make
        sure to activate your account. The link in the email will expire in 24
        hours.
      </p>
      <br />
      <p>
        <NavLink to="/signin" color="primary">
          Sign In
        </NavLink>
        to start using our services.
      </p>
    </div>
  );
}
