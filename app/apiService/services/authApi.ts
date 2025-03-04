import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApiConfiguration, queryConfiguration } from "../utils";
import { LoginRequest, LoginResponse } from "@/app/auth/models/loginModels";
import {
  RegistrationResponse,
  RegistrationRequest,
} from "@/app/auth/models/signupModels";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  VerifyOtpRequest,
} from "@/app/auth/models/authModels";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(
    createApiConfiguration({ callwithUserData: false })
  ),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (payload) =>
        queryConfiguration({
          url: "/login/",
          method: "POST",
          body: payload,
        }),
    }),

    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (payload) =>
        queryConfiguration({
          url: "/register/",
          method: "POST",
          body: payload,
        }),
    }),

    verifyOtp: builder.mutation<LoginResponse, VerifyOtpRequest>({
      query: (payload) =>
        queryConfiguration({
          url: "/verify-otp/",
          method: "POST",
          body: payload,
        }),
    }),

    changePassword: builder.mutation<LoginResponse, VerifyOtpRequest>({
      query: (payload) =>
        queryConfiguration({
          url: "/change-password/",
          method: "POST",
          body: payload,
        }),
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (credentials) =>
        queryConfiguration({
          url: "/forgot-password/",
          method: "POST",
          body: credentials,
        }),
    }),

    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (credentials) =>
        queryConfiguration({
          url: "/resend-otp/",
          method: "POST",
          body: credentials,
        }),
    }),

    logout: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (credentials) =>
        queryConfiguration({
          url: "/logout/",
          method: "POST",
          body: credentials,
        }),
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (credentials) =>
        queryConfiguration({
          url: "/token/refresh/",
          method: "POST",
          body: credentials,
        }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
} = authApi;
