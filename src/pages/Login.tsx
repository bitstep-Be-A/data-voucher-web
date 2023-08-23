import { useSearchParams } from "react-router-dom";

import {
  LoginForm,
  FindCredentialIdForm,
  FindCredentialPwForm
} from "../views/forms/login.form";
import { CenteredContainer } from "../views/containers/base.container";
import NotFound from "./NotFound";

export default function LoginPage() {
  const [searchParams, _] = useSearchParams();
  const find = searchParams.get('find');

  let Form: JSX.Element;

  if (!find) {
    Form = <LoginForm />;
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
