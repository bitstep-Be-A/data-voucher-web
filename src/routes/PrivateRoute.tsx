import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/auth.hook";
import { routes } from "./path";

import { BaseContainer } from "../components/containers/base.container";

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
