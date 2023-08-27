import { createContext, useContext } from "react";

import type { SignupSerializer } from "../domains/account/signup.impl";

export interface ISignupContext {
  accepted: boolean[];
  setAccepted: (accepted: boolean[]) => void;
  serializer: SignupSerializer;
  step: number;
}

export const SignupContext = createContext<ISignupContext | undefined>(undefined);

export const useSignup = (): ISignupContext => {
  const signupContext = useContext(SignupContext);
  if (!signupContext) {
    throw new Error('useSignup must be used within an SignupProvider');
  }
  return signupContext;
};
