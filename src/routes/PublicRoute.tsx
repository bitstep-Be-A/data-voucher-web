import { Outlet } from "react-router-dom";
import { BaseContainer } from "../views/containers/base.container";

export default function PublicRoute() {
  return (
    <BaseContainer>
      <Outlet />
    </BaseContainer>
  )
}
