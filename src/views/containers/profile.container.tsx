import { useEffect, useMemo } from "react";
import { useRecoilValueLoadable } from "recoil";

import { ProfileContext } from "../../context/profile.context";
import { profileState, useProfileQuery } from "../../recoil/app/ProfileQuery";
import { profileMutation_update } from "../../recoil/app/ProfileMutation";
import { useAuth } from "../../context/auth.context";
import Container from "@mui/material/Container";

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const profileLoadable = useRecoilValueLoadable(profileState);

  const profileUpdateLoadable = useRecoilValueLoadable(profileMutation_update);

  const {logout} = useAuth();
  const {refresh} = useProfileQuery();

  useEffect(() => {
    if (profileUpdateLoadable.state === "hasError") {
      if (profileUpdateLoadable.contents.code === 401) logout();
      else {
        alert("에러가 발생했습니다.");
        console.error(profileUpdateLoadable.contents);
      }
      return;
    }
    if (profileUpdateLoadable.state === "loading") {
      profileUpdateLoadable.toPromise().then((result) => {
        if (!!result) {
          alert("업데이트가 완료되었습니다.");
          refresh();
        }
      });
    }
  }, [profileUpdateLoadable, logout]);

  const element = useMemo(() => {
    switch (profileLoadable.state) {
      case 'hasValue':
        return (
          <ProfileContext.Provider value={{
            contents: profileLoadable.contents,
            loading: false
          }}>
            {children}
          </ProfileContext.Provider>
        );
      case 'loading':
        return (
          <ProfileContext.Provider value={{
            loading: true
          }}>
            {children}
          </ProfileContext.Provider>
        );
      case 'hasError':
        console.error(profileLoadable.contents);
        logout();
        return <></>;
    }
  }, [profileLoadable, logout]);

  return element;
}

const ProfileContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileProvider>
      <Container maxWidth={"md"} sx={{width: "100%"}}>
        {children}
      </Container>
    </ProfileProvider>
  );
}

export default ProfileContainer;
