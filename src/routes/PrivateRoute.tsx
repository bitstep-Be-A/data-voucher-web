import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth.context";
import { routes } from "./path";

import { BaseContainer } from "../views/containers/base.container";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.userIdRef.current) { navigate(routes.login.path) }
  }, [auth, navigate]);

  return (
    <BaseContainer>
      <Outlet/>
    </BaseContainer>
  );
}
