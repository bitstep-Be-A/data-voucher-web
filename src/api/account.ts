import { Axios } from "./axios";

import { ID } from "../types/common";

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
