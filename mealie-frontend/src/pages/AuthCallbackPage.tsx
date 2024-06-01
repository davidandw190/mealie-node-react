import { useEffect, useRef } from "react";

import { useAuth0 } from "@auth0/auth0-react"
import { useCreateUser } from "@/api/UserAPI";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateUser();
  const navigate = useNavigate();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0_id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    navigate('/');
  }, [createUser, navigate, user?.email, user?.sub])

  return <>Loading..</>;
}

export default AuthCallbackPage;