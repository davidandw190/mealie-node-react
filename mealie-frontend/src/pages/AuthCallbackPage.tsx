import { useEffect, useRef } from "react";

import { useAuth0 } from "@auth0/auth0-react"
import { useCreateUser } from "@/api/UserAPI";
import { useNavigate } from "react-router-dom";

/**
 * AuthCallbackPage component handles the callback after user authentication.
 * 
 * This component is responsible for emitting a user creation event to the backend.
 * The backend will check if the user already exists or not, and if not, it will create the user,
 * otherwise, it will create the user. This happens only once per component lifetime.
 * After this, it navigates the user to the home page.
 * 
 * @component
 */

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