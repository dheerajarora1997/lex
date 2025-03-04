"use client";
import { Suspense } from "react";
import { ValidationProvider } from "@/app/providers/validationProvider";
import AuthFooter from "../components/authFooter";
import styles from "../styles/login.module.scss";
import AuthHeader from "../components/authHeader";
import OtpInput from "@/app/components/common/formFields/otpFields";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/app/store/store";
import {
  useResendOtpMutation,
  useChangePasswordMutation,
  useVerifyOtpMutation,
} from "@/app/apiService/services/authApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationView from "../components/confirmationView";
import { showErrorToast, showSuccessToast } from "@/app/hooks/useNotify";
import { PasswordInput } from "@/app/components/common/formFields/passwordInput";
import { passwordInputRules } from "../login/constants";
import TokenManager from "@/app/apiService/tokenManager";

function VerifyOtpContent() {
  const { email } = useAppSelector((state) => state.authData);
  const { verification_id } = useAppSelector((state) => state.authData);
  const [otp, setOtp] = useState<string>("");
  const [showConfirmationView, setShowConfirmationView] =
    useState<boolean>(false);
  // const searchParams = useSearchParams();
  // const signup = searchParams.get("signup");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const [
    verifyOtp,
    {
      isLoading,
      isError: isVerifyOtpError,
      data: verifyOtpData,
      error: verifyOtpError,
      status: verifyOtpStatus,
    },
  ] = useVerifyOtpMutation();

  const [
    changePassword,
    {
      isLoading: isChangePasswordLoading,
      isError: isChangePasswordError,
      data: changePasswordData,
      error: changePasswordError,
      status: changePasswordStatus,
    },
  ] = useChangePasswordMutation();

  const [
    resendOtp,
    { isError: isResendOtpError, error: resendOtpError, data: resendOtpData },
  ] = useResendOtpMutation();

  interface FetchBaseQueryError {
    data?: {
      non_field_errors?: string[];
      message?: string;
    };
  }

  useEffect(() => {
    if (
      isVerifyOtpError ||
      verifyOtpError ||
      isChangePasswordError ||
      changePasswordError
    ) {
      if (isVerifyOtpError || verifyOtpError) {
        const errorMessage =
          (verifyOtpError as FetchBaseQueryError)?.data?.message ||
          "An error occurred";
        showErrorToast(errorMessage);
      }
      if (isChangePasswordError || changePasswordError) {
        const errorMessage =
          (changePasswordError as FetchBaseQueryError)?.data?.message ||
          "An error occurred";
        showErrorToast(errorMessage);
      }
    }
  }, [
    isVerifyOtpError,
    verifyOtpError,
    isChangePasswordError,
    changePasswordError,
  ]);

  useEffect(() => {
    if (isResendOtpError || resendOtpError) {
      const errorMessage =
        (verifyOtpError as FetchBaseQueryError)?.data?.message ||
        "Please wait 90 seconds before requesting a new OTP";
      showErrorToast(errorMessage);
    }
  }, [isResendOtpError, resendOtpError]);

  useEffect(() => {
    if (resendOtpData?.message) {
      showSuccessToast(resendOtpData?.message ?? "OTP sent successfully");
    }
  }, [resendOtpData]);

  useEffect(() => {
    let timeoutId = null;

    if (verifyOtpData && verifyOtpStatus === QueryStatus.fulfilled) {
      setShowConfirmationView(true);
      TokenManager.setAccessToken(verifyOtpData?.tokens?.access || "");
      TokenManager.setRefreshToken(verifyOtpData?.tokens?.refresh || "");
      timeoutId = setTimeout(() => {
        router.push("/conversation/new");
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [verifyOtpData, verifyOtpStatus]);

  useEffect(() => {
    let timeoutId = null;

    if (changePasswordData && changePasswordStatus === QueryStatus.fulfilled) {
      timeoutId = setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [verifyOtpData, verifyOtpStatus]);

  const onClickVerifyOtp = async () => {
    if (verification_id) {
      const payload = {
        verification_id: verification_id,
        email: email,
        otp: otp,
        new_password: password,
      };
      await changePassword(payload);
    } else {
      const payload = {
        email: email,
        otp: otp,
      };
      await verifyOtp(payload);
    }
  };

  const onClickResendOtp = async () => {
    const payload = {
      email: email,
    };
    await resendOtp(payload);
  };

  return (
    <Suspense>
      <div className={styles.transition_view}>
        <div
          className={`${styles.auth_container} ${styles.view} ${
            !showConfirmationView ? styles.active : styles.hidden
          }`}
        >
          <div className={styles.auth_inner_container}>
            <AuthHeader
              title="Verify Your Email"
              subtitle={
                <span>
                  Enter the 6-digit OTP sent to
                  <br />
                  <span className={styles.email_text}>{email}</span>
                </span>
              }
            />
            <ValidationProvider>
              <form>
                <OtpInput
                  length={6}
                  onComplete={(otp) => setOtp(otp)}
                  onClickResend={onClickResendOtp}
                />
                {verification_id && (
                  <>
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
                  </>
                )}
              </form>
            </ValidationProvider>
            <AuthFooter
              btnDisableState={
                (verification_id
                  ? password.length < 8 || password !== confirmPassword
                  : false) || otp.length !== 6
              }
              isPrimaryButtonLoading={isLoading || isChangePasswordLoading}
              onClickPrimaryButton={onClickVerifyOtp}
            />
          </div>
        </div>
        <div
          className={`${styles.view} ${
            showConfirmationView ? styles.active : styles.hidden
          }`}
        >
          <ConfirmationView
            title="You're All Set!"
            description="Your account has been successfully created. Get ready to explore and make the most of your journey with us!"
            imageSrc="https://storage.cloud.google.com/lex_assets/confirmation_checkbox.png?authuser=1"
          />
        </div>
      </div>
    </Suspense>
  );
}

function VerifyOtp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}

export default VerifyOtp;
