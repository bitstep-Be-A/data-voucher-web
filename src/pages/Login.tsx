import { useSearchParams } from "react-router-dom";

import { loginApi } from "../api/account";
import {
  LoginForm,
  FindCredentialIdForm,
  FindCredentialPwForm
} from "../views/interactor/LoginForm";
import { CenteredContainer } from "../views/containers/base.container";
import type { LoginRequest } from "../domain/account/login.interface";
import { useAuth } from "../context/auth.context";

import NotFound from "./NotFound";

export default function LoginPage() {
  const [searchParams, _] = useSearchParams();
  const find = searchParams.get('find');
  const auth = useAuth();

  let Form: JSX.Element;

  if (!find) {
    Form = (
      <LoginForm
        login={async (formData: LoginRequest) => {
          try {
            const data = await loginApi.login({
              "Email_ID": formData.emailId,
              "Password": formData.password
            });
            auth.login(data.userId);
          } catch {
            alert("[로그인 실패] 로그인 정보를 다시 입력해주세요.")
          }
        }}
      />
    );
  }
  else if (find === 'id') {
    Form = <FindCredentialIdForm />
  }
  else if (find === 'pw') {
    Form = <FindCredentialPwForm />
  }
  else { Form = <NotFound/> }

  return (
    <CenteredContainer>
      { Form }
    </CenteredContainer>
  );
}
