import { atom } from "recoil";

export type FindIDEmailVerification = {
  email: string;
};

export type FindIDRequest = {
  code: string;
};

export const findIdEmailVerficationState = atom<FindIDEmailVerification>({
  key: "recoil/app/FindIDRequest/EmailInput",
  default: {
    email: ""
  }
});

export const findIdRequestState = atom<FindIDRequest>({
  key: "recoil/app/FindIDRequet/Code",
  default: {
    code: ""
  }
});
