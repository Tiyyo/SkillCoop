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
import { loginUserFn } from "../../../api/auth.fn";
import { getMeFn } from "../../../api/profile.fn";
import { useApp } from "../../../shared/store/app.store";
import { detectFirstAccess } from "../../../shared/utils/is-first-connection";
import { Credentials } from "packages/types/src";
import { useGetUserPreferences } from "../../settings/hooks/useUserPreference";

/*eslint-enable*/
function useAuth() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isFristConnection, setIsFirstConnection } = useApp();
  const [loginError, setLoginError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(undefined);
  // This query cant have the same key as the other getMe query
  // since this query trigger the authentication of user automatically
  // and we dont want this behavior for this one
  const { data: responseGetProfile } = useQuery(
    [''],
    async () => {
      return getMeFn();
    },
    { enabled: isAuthenticated },
  );

  const getUserPreferencesCondition = () => {
    if (
      typeof responseGetProfile !== 'string' &&
      responseGetProfile &&
      isAuthenticated
    ) {
      return responseGetProfile.userId;
    }
  };

  const { data: userPreferences } = useGetUserPreferences({
    userId: '6ed3dedc-2e60-43b1-84db-8bb97294383a',
  });

  console.log(userPreferences);

  const { mutate: mutateLoginFn, error: errorLogin } = useMutation({
    mutationFn: async (credentials: Credentials) => loginUserFn(credentials),
    onSuccess: (response) => {
      if (response.error) {
        setLoginError(response.error);
        setLoginAttempts(response.failedAttemps);
        setLoading(false);
        return;
      }
      // trigger the query to get the user profile data
      setIsAuthenticated(true);
    },
    onError: (err) => {
      if (err instanceof Error && err?.message.includes('timeout')) {
        setLoginError('Server is not responding');
      }
      setLoading(false);
    },
  });

  // Login function to be called from the login page
  function loginFn(credentials: Credentials) {
    setLoading(true);
    mutateLoginFn(credentials);
  }

  useEffect(() => {
    setIsFirstConnection(detectFirstAccess(responseGetProfile));
  }, [responseGetProfile]);

  return {
    loginFn,
    loading,
    error: (errorLogin as any)?.response?.data.error,
    loginError,
    loginAttempts,
    isFristConnection,
    isAuthenticated,
    responseGetProfile,
  };
}

export default useAuth;
