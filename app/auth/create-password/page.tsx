"use client";
import { ValidationProvider } from "@/app/providers/validationProvider";
import AuthFooter from "../components/authFooter";
import styles from "../styles/login.module.scss";
import AuthHeader from "../components/authHeader";
import { useState } from "react";
import { passwordInputRules } from "../login/constants";
import { PasswordInput } from "@/app/components/common/formFields/passwordInput";
import ConfirmationView from "../components/confirmationView";

function CreatePassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmationView, setShowConfirmationView] =
    useState<boolean>(false);

  const onClickContinue = () => {
    setShowConfirmationView(true);
  };

  return (
    <div className={styles.transition_view}>
      <div
        className={`${styles.auth_container} ${styles.view} ${
          !showConfirmationView ? styles.active : styles.hidden
        }`}
      >
        <div className={styles.auth_inner_container}>
          <AuthHeader
            title="Create Password"
            subtitle={
              "Secure your account with a strong password you'll remember"
            }
          />
          <ValidationProvider>
            <form>
              <PasswordInput
                label="Password"
                name="password"
                placeholder="Password"
                value={password ?? ""}
                onChange={(e) => setPassword(e.target.value)}
                rules={passwordInputRules}
              />

              <PasswordInput
                label="Confirm Password"
                name="password"
                placeholder="Confirm Password"
                value={confirmPassword ?? ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
                rules={passwordInputRules}
              />
            </form>
          </ValidationProvider>
          <AuthFooter onClickPrimaryButton={onClickContinue} />
        </div>
      </div>
      <div
        className={`${styles.view} ${
          showConfirmationView ? styles.active : styles.hidden
        }`}
      >
        <ConfirmationView
          title="Password Updated"
          description="Your password has been successfully updated! You can now log in with your new password."
          imageSrc="https://storage.cloud.google.com/lex_assets/confirmation_icon_2.png?authuser=1"
        />
      </div>
    </div>
  );
}

export default CreatePassword;
