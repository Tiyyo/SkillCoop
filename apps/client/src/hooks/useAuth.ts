/* eslint-disable*/
// should make a request to server to know if the credentials enter by user are valid
// the state of application should be a loading until the complete resolution of all requests
// should return an error if not valid
// algo should stop and display an error message to user
// should return a 200 if valid
// if valid we should store the token in state barer token
// then make a query to get user profile data to determine if it's a first time connection
// if first time connection we should redirect to the onboarding page
// should make a mechanism to avoid user who connect to the first time to access the complete application
// if not first time connection we should redirect to the home page 

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { loginUserFn } from "../api/auth.fn";
import { getMeFn } from "../api/profile.fn";
import { useApp } from "../store/app.store";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { detectFirstAccess } from "../utils/is-first-connection";
import { Credentials } from "packages/types/src";

/*eslint-enable*/
function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isFristConnection, setIsFirstConnection } = useApp();
  const [loginError, setLoginError] = useState('');
  const [loginAttemps, setLoginAttemps] = useState(undefined);
  // This query cant have the same key as the other getMe query
  // since is that this query trigger the authentication of user automatically
  // and we dont want this behavior for this one
  const { data: responseGetProfile } = useQuery(
    [''],
    async () => {
      return getMeFn();
    },
    { enabled: isAuthenticated },
  );

  const { mutate: mutateLoginFn, error: errorLogin } = useMutation({
    mutationFn: async (credentials: Credentials) => loginUserFn(credentials),
    onSuccess: (response) => {
      if (response.error) {
        setLoginError(response.error);
        setLoginAttemps(response.failedAttemps);
        setLoading(false);
      }
      // trigger the query to get the user profile data
      setIsAuthenticated(true);
    },
    onError: () => {
      setLoading(false);
    },
  });

  // Login function to be called from the login page
  const loginFn = (credentials: Credentials) => {
    setLoading(true);
    mutateLoginFn(credentials);
  };

  if (loading && isAuthenticated && isFristConnection) {
    if (responseGetProfile === 'Unecessary call' || !responseGetProfile) {
      return;
    }
    return navigate(`/onboarding/${responseGetProfile.userId}`);
  }

  if (loading && isAuthenticated && isFristConnection === false) {
    queryClient.setQueryData(['auth-user'], (oldData: any) => {
      if (
        responseGetProfile !== 'Unecessary call' &&
        responseGetProfile?.userProfile &&
        oldData
      ) {
        return {
          ...oldData,
          ...responseGetProfile.userProfile,
        };
      } else {
        return oldData;
      }
    });
    return navigate('/');
  }

  useEffect(() => {
    setIsFirstConnection(detectFirstAccess(responseGetProfile));
  }, [responseGetProfile]);

  return {
    loginFn,
    loading,
    error: (errorLogin as any)?.response.data.error,
    loginError,
    loginAttemps,
  };
}

export default useAuth;
