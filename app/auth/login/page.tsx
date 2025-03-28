"use client";

import styles from "../styles/login.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import AuthHeader from "../components/authHeader";
import { ValidationProvider } from "@/app/providers/validationProvider";

import { LoginRequest } from "../models/loginModels";
import { useLoginMutation } from "@/app/apiService/services/authApi";
import { QueryStatus } from "@reduxjs/toolkit/query";
import TokenManager from "@/app/apiService/tokenManager";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/app/hooks/useNotify";
import { APP_ERROR_MESSAGE } from "@/app/constants/appConstants";
import { isFetchBaseQueryError } from "@/app/utils/apiErrorUtils";
import LoginForm from "./components/form";

interface FetchBaseQueryError {
  data?: {
    non_field_errors?: string[];
    message?: string;
  };
}

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [login, { isLoading, isError, data, error, status }] =
    useLoginMutation();

  function handleUserLogin() {
    TokenManager.setAccessToken(data?.tokens?.access ?? "");
    TokenManager.setRefreshToken(data?.tokens?.refresh ?? "");
  }

  useEffect(() => {
    if (data && status === QueryStatus.fulfilled) {
      handleUserLogin();
      if (data?.user?.metadata?.onboarded) {
        router.push("/conversation/new");
      } else if (!data?.user?.metadata?.onboarded) {
        router.push("/onboarding");
      }
    }
  }, [data, status]);

  useEffect(() => {
    if (isError && error) {
      if (isFetchBaseQueryError(error) && error?.status === 401) {
        const errorMessage =
          (error as FetchBaseQueryError)?.data?.message || "An error occurred";
        showErrorToast(errorMessage ?? APP_ERROR_MESSAGE);
      } else {
        showErrorToast(APP_ERROR_MESSAGE);
      }
    }
  }, [isError, error]);

  function onChangeFormField(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const onClickLogin = async () => {
    await login(formData);
  };
  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_inner_container}>
        <AuthHeader title="Welcome Back" subtitle="To continue please Login" />
        <ValidationProvider>
          <LoginForm
            onChangeFormField={onChangeFormField}
            formData={formData}
            isLoading={isLoading}
            onClickLogin={() => onClickLogin()}
          />
        </ValidationProvider>
      </div>
    </div>
  );
}

export default Login;
