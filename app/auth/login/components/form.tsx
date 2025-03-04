import { EmailInput } from "@/app/components/common/formFields/emailInput";
import { PasswordInput } from "@/app/components/common/formFields/passwordInput";
import { emailInputRules, passwordInputRules } from "../constants";
import AuthFooter from "../../components/authFooter";
import styles from "../../styles/login.module.scss";
import { LoginRequest } from "../../models/loginModels";
import { ChangeEvent, useContext } from "react";
import { ValidationContext } from "@/app/providers/validationProvider";
import Link from "next/link";

function LoginForm({
  formData,
  onChangeFormField,
  isLoading,
  onClickLogin,
}: {
  formData: LoginRequest;
  onChangeFormField: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
  isLoading: boolean;
}) {
  const { validateForm } = useContext(ValidationContext);

  return (
    <div className={styles.auth_form_container}>
      <form>
        <EmailInput
          label="Email"
          name="email"
          placeholder="Enter Email"
          value={formData?.email ?? ""}
          onChange={onChangeFormField}
          rules={emailInputRules}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter Password"
          value={formData?.password ?? ""}
          onChange={onChangeFormField}
          rules={passwordInputRules}
        />
        <div className={styles.forgot_pass_container}>
          <Link href="/auth/forgot-password">Forgot Password ?</Link>
        </div>
      </form>
      <AuthFooter
        btnText="Login"
        btnDisableState={!formData?.email || !formData?.password}
        onClickPrimaryButton={() => {
          if (validateForm() && !isLoading) {
            onClickLogin();
          }
        }}
        isPrimaryButtonLoading={isLoading}
      />
    </div>
  );
}

export default LoginForm;
