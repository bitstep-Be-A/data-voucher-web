import { Axios } from "./axios"

export const signupApi = {
  signupInfo: async (data: object) => {
    const response = await Axios.post('/회원가입 정보입력/signup/info', data);
    return response.data;
  },
  signupVerify: async (code: string) => {
    const response = await Axios.post('/회원가입 본인인증/signup/verify', {"VerificationCode": code});
    return response.data;
  },
  signupComplete: async () => {
    const response = await Axios.post('/회원가입 완료/sign/complete');
    const data = response.data;
    return {userId: data['MemberNo'] as number}
  }
}
