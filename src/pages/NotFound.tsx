import { Link } from "react-router-dom";

import { routes } from "../routes/path";

import { BaseContainer, CenteredContainer } from "../views/containers/base.container";

export default function NotFound() {
  return (
    <BaseContainer>
      <CenteredContainer className="flex-col">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <p>
          <Link to={routes.home.path}>Home</Link>
        </p>
      </CenteredContainer>
    </BaseContainer>
  );
}
