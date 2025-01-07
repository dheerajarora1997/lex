"use client";

import styles from "../styles/login.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import AuthHeader from "../components/authHeader";
import { ValidationProvider } from "@/app/providers/validationProvider";
// import AuthFooter from "../components/authFooter";
import { RegistrationRequest } from "../models/signupModels";
import { useRegisterMutation } from "@/app/apiService/services/authApi";
import { useRouter } from "next/navigation";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { showErrorToast } from "@/app/hooks/useNotify";
import SignupForm from "./components/form";
import { setAuthData } from "@/app/store/slices/authSlice";
import { isFetchBaseQueryError } from "@/app/utils/apiErrorUtils";
import { APIErrorData } from "@/app/models/commonApiModels";
import { APP_ERROR_MESSAGE } from "@/app/constants/appConstants";

function Signup() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<RegistrationRequest>({
    email: "",
    phone: undefined,
    password: "",
    first_name: "",
    last_name: "",
    user_type: undefined,
  });
  const router = useRouter();

  const [register, { isLoading, isError, data, error, status }] =
    useRegisterMutation();

  function onChangeFormField(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (error && isError) {
      if (isFetchBaseQueryError(error) && error?.status === 400) {
        const errorData = error.data as APIErrorData;
        console.log(error);
        showErrorToast(errorData?.error?.[0] ?? APP_ERROR_MESSAGE);
      } else {
        showErrorToast(APP_ERROR_MESSAGE);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (data && status === QueryStatus.fulfilled) {
      dispatch(setAuthData({ name: "email", value: data?.email ?? "" }));
      router.push("/auth/verify-otp?signup=true");
    }
  }, [data, status]);

  const onClickSignup = async () => {
    await register(formData);
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_inner_container}>
        <AuthHeader
          title="Welcome to Lex"
          subtitle="To continue please Signup"
        />
        <ValidationProvider>
          <SignupForm
            isLoading={isLoading}
            onClickSignup={onClickSignup}
            formData={formData}
            onChangeFormField={onChangeFormField}
            setFormData={setFormData}
          />
        </ValidationProvider>
      </div>
    </div>
  );
}

export default Signup;
