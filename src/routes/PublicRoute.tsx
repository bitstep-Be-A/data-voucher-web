import { Outlet } from "react-router-dom";
import { BaseContainer } from "../components/containers/base.container";

export default function PublicRoute() {
  return (
    <BaseContainer>
      <Outlet />
    </BaseContainer>
  )
}
