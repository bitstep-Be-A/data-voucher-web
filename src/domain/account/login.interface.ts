import { ID } from "../../types/common";

export interface LoginRequest {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  userId: ID;
}

export interface LoginService {
  login: (formData: LoginRequest) => Promise<void>;
}
