import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { getMeFn } from '../api/api.fn';
import { useStateContext } from '../context/app.context';
// import FullScreenLoader from "../components/FullScreenLoader";
import React from 'react';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const stateContext = useStateContext();

  const query = useQuery(['authUser'], () => getMeFn(), {
    enabled: !!cookies.logged_in,
    // get user profile from api
    select: (data) => data.data.user,
    // set user profile to state
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  if (query.isLoading && cookies.logged_in) {
    // replace by a spinnin loader
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthMiddleware;
