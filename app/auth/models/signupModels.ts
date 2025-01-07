import { UserType } from "./loginModels";

export interface RegistrationRequest {
  email?: string;
  phone?: number;
  password?: string;
  first_name?: string;
  last_name?: string;
  user_type?: UserType;
}

export interface RegistrationResponse {
  message?: string;
  email?: string;
}
