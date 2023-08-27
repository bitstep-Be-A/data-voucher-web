import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth.context";
import { routes } from "./path";

import { BaseContainer } from "../views/containers/base.container";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.tokenRef.current) { navigate(routes.login.path) }
  }, [auth, navigate]);

  return (
    <BaseContainer>
      <Outlet/>
    </BaseContainer>
  );
}
