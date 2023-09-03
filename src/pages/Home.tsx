import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { routes } from "../routes/path";
import { USER_ID_SESSION_KEY } from "../constants/auth.constant";

const HomePage = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem(USER_ID_SESSION_KEY);
  useEffect(() => {
    if (userId) {
      navigate(routes.search.path);
    } else {
      navigate(routes.login.path);
    }
  }, [navigate]);
  return (
    <></>
  );
}

export default HomePage;
