export type LoginRequest =
  | { email: string; password: string; phone?: never }
  | { phone: number; password: string; email?: never };

export type UserType = "LAWYER" | "STUDENT";

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    user_type: UserType;
    metadata: {
      onboarded: boolean;
      onboarding_time: null | string;
    };
  };
  tokens: {
    refresh: string;
    access: string;
  };
}
