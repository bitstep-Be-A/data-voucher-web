import { createContext, useContext } from "react";
import { ProfileQuery$data } from "../recoil/app/ProfileQuery";


interface ProfileContextValue {
  contents?: ProfileQuery$data;
  loading: boolean;
}

export const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const useProfileContext = () => useContext(ProfileContext)!
