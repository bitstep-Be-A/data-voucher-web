import { createContext, useContext } from "react";

import { ID } from "../types/common";

export interface IAuthContext {
  tokenRef: React.MutableRefObject<string>;
  userId: ID;
  logout: () => void;
  login: (userId: ID) => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};
