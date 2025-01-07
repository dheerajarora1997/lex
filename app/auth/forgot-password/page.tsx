"use client";
import { ValidationProvider } from "@/app/providers/validationProvider";
import AuthFooter from "../components/authFooter";
import styles from "../styles/login.module.scss";
import AuthHeader from "../components/authHeader";
import { EmailInput } from "@/app/components/common/formFields/emailInput";
import { useState } from "react";
import { emailInputRules } from "../login/constants";
import { useResendOtpMutation } from "@/app/apiService/services/authApi";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const [resendOtp] = useResendOtpMutation();

  const onClickContinue = async () => {
    await resendOtp({ email: email });
    router.push("/auth/verify-otp");
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_inner_container}>
        <AuthHeader
          title="Forgot Password"
          subtitle={
            "Enter your registered email or phone number to reset your password"
          }
        />
        <ValidationProvider>
          <form>
            <EmailInput
              label="Email"
              name="email"
              placeholder="Enter Email"
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
              rules={emailInputRules}
            />
          </form>
        </ValidationProvider>
        <AuthFooter onClickPrimaryButton={onClickContinue} />
      </div>
    </div>
  );
}

export default ForgotPassword;
