import { createContext, useContext } from "react";

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
