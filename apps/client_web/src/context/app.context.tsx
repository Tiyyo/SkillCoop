import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getMeFn } from "../api/authApi";

type State = {
  userProfile: any;
  isAuth: boolean;
};

type Action = {
  type: string;
  payload: any;
};

type Dispatch = (action: Action) => void;
type StateContextProviderProps = { children: React.ReactNode };

const initialState: State = {
  userProfile: null,
  isAuth : false
};

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch, loading : boolean } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case "SET_IS_AUTH": {
      return {  ...state, isAuth: action.payload };
      }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const { data , isError, isLoading, isFetching } = useQuery(["authUser"], () => getMeFn(), {
    enabled: true,
  });

  const loading = isLoading || isFetching

  const value = { state, dispatch, loading };

  useEffect(() => {
    if (data && data.userProfile) {
      dispatch({ type: "SET_USER", payload: data.userProfile })
      dispatch({ type: "SET_IS_AUTH", payload: true })
    } else {
      dispatch({ type: "SET_USER", payload: null })
      dispatch({ type: "SET_IS_AUTH", payload: false })
    }
  }, [data, isError])

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
