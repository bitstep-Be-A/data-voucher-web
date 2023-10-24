import { useSetRecoilState } from "recoil";
import ProfileForm from "../presenters/my/ProfileForm";
import { profileUpdateRequestState } from "../../recoil/app/ProfileMutation";

const ProfileInteractor = () => {
  const setProfileUpdateRequest = useSetRecoilState(profileUpdateRequestState);
  return (
    <ProfileForm
      update={(form) => {
        setProfileUpdateRequest(form);
      }}
    />
  );
}

export default ProfileInteractor;
