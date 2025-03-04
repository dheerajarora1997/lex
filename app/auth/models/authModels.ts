export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access?: string;
  refresh?: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  verification_id: string;
}

export interface ResendOtpResponse {
  message?: string;
}
