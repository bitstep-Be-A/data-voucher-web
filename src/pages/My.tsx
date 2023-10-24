import ProfileContainer from "../views/containers/profile.container";
import ProfileInteractor from "../views/interactor/ProfileInteractor";

export default function MyPage() {
  return (
    <ProfileContainer>
      <ProfileInteractor />
    </ProfileContainer>
  );
}
