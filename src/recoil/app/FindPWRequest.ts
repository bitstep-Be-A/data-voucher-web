import { atom } from "recoil";

export type FindPWEmailVerification = {
  email: string;
};

export type FindPWRequest = {
  code: string;
  password: string;
  passwordConfirm: string;
}

export const findPwEmailVerification = atom<FindPWEmailVerification>({
  key: "recoil/app/FindIDRequest/EmailInput",
  default: {
    email: ""
  }
});

export const findPWRequestState = atom<FindPWRequest>({
  key: "recoil/app/FindIDRequet/Code",
  default: {
    code: "",
    password: "",
    passwordConfirm: ""
  }
});

