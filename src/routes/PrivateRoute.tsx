import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { routes } from "./path";
import { USER_ID_SESSION_KEY } from "../constants/auth.constant";

import { BaseContainer } from "../views/containers/base.container";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem(USER_ID_SESSION_KEY);

  useEffect(() => {
    if (!userId) { navigate(routes.login.path) }
  }, [navigate]);

  return (
    <BaseContainer>
      <Outlet/>
    </BaseContainer>
  );
}
