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
  useVerifyOtpMutation,
} from "@/app/apiService/services/authApi";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmationView from "../components/confirmationView";
import { showErrorToast } from "@/app/hooks/useNotify";

function VerifyOtp() {
  const { email } = useAppSelector((state) => state.authData);
  const [otp, setOtp] = useState<string>("");
  const [showConfirmationView, setShowConfirmationView] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const signup = searchParams.get("signup");

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

  const [resendOtp, { isError: isResendOtpError, error: resendOtpError }] =
    useResendOtpMutation();

  useEffect(() => {
    if (isVerifyOtpError || verifyOtpError) {
      showErrorToast("Something went wrong!");
    }
  }, [isVerifyOtpError, verifyOtpError]);

  useEffect(() => {
    if (isResendOtpError || resendOtpError) {
      showErrorToast("Something went wrong!");
    }
  }, [isResendOtpError, resendOtpError]);

  useEffect(() => {
    let timeoutId = null;

    if (verifyOtpData && verifyOtpStatus === QueryStatus.fulfilled) {
      if (signup === "true") {
        setShowConfirmationView(true);
        timeoutId = setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        router.push("/auth/create-password");
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [verifyOtpData, verifyOtpStatus]);

  const onClickVerifyOtp = async () => {
    const payload = {
      email: email,
      otp: +otp,
    };
    await verifyOtp(payload);
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
              </form>
            </ValidationProvider>
            <AuthFooter
              isPrimaryButtonLoading={isLoading}
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

export default VerifyOtp;
