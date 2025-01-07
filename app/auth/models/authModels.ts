export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access?: string;
  refresh?: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: number;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  message?: string;
}
