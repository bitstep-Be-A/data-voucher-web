import { Axios } from "./axios";

import { ID } from "../types/common";
import { LoginResponse } from "../domain/account/login.interface";

export const signupApi = {
  signupInfo: async (data: object) => {
    const response = await Axios.post('/signup/info', data);
    return response.data;
  },
  signupVerify: async (code: string) => {
    const response = await Axios.post('/signup/verify', {"VerificationCode": code});
    return response.data;
  },
  signupComplete: async () => {
    const response = await Axios.post('/signup/complete');
    const data = response.data;
    return {userId: data['MemberNo'] as ID}
  }
}

export const loginApi = {
  login: async (data: object): Promise<LoginResponse> => {
    const response = await Axios.post('/로그인/login', data);
    return {userId: response.data['MemberNo'] as ID};
  },
  idFindVerify: async (data: {
    "Email": string;
  }): Promise<{
    "message": string;
    "verification_code": string;
  }> => {
    const response = await Axios.post('/아이디찾기 인증요청/ID_find/request_code', data);
    return response.data;
  },
  idFind: async (data: {
    "verification_code": string;
  }): Promise<{
    "user_id": string;
    "message": string;
  }> => {
    const response = await Axios.post('/아이디찾기 인증완료/ID_find/verify_code', data);
    return response.data;
  },
  pwFindVerify: async (data: {
    "Email_ID": string;
  }): Promise<{
    "message": string;
  }> => {
    const response = await Axios.post('/비밀번호 재설정 코드 요청/password_reset/request_code', data);
    return response.data;
  },
  pwFind: async (data: {
    "code": string;
    "new_password": string;
    "new_password_confirm": string;
  }): Promise<{
    "message": string;
  }> => {
    const response = await Axios.post('비밀번호 재설정 완료/password_reset/verify_and_reset', data);
    return response.data
  }
}
