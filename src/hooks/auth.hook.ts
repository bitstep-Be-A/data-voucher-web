import { createContext, useContext } from "react";

import type { SignupSerializer } from "../domains/auth.impl";

export interface IAuthContext {
  tokenRef: React.MutableRefObject<string>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
};

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
