"use client";
import { ValidationProvider } from "@/app/providers/validationProvider";
import AuthFooter from "../components/authFooter";
import styles from "../styles/login.module.scss";
import AuthHeader from "../components/authHeader";
import { EmailInput } from "@/app/components/common/formFields/emailInput";
import { useEffect, useState } from "react";
import { emailInputRules } from "../login/constants";
import { useForgotPasswordMutation } from "@/app/apiService/services/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthData } from "@/app/store/slices/authSlice";

function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const [forgotPassword, { data }] = useForgotPasswordMutation();

  const dispatch = useDispatch();

  const onClickContinue = async () => {
    await forgotPassword({ email: email });
  };

  useEffect(() => {
    if (data) {
      dispatch(setAuthData({ name: "email", value: email }));
      dispatch(
        setAuthData({ name: "verification_id", value: data?.verification_id })
      );
      router.push("/auth/verify-otp");
    }
  }, [data]);

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
