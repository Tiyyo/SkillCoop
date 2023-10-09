import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../context/app.context"
import { getMeFn } from "../api/api.fn";
import { useEffect } from "react";

function useAuth() {
  const stateContext = useStateContext()
  const { data: profile, isError, isLoading, isFetching } = useQuery(["authUser"], () => getMeFn(), {
    enabled: true,
  });

  const loading = isLoading || isFetching

  useEffect(() => {
    if (profile) {
      stateContext.dispatch({ type: "SET_USER", payload: profile })
      stateContext.dispatch({ type: "SET_IS_AUTH", payload: true })
    } else {
      stateContext.dispatch({ type: "SET_USER", payload: null })
      stateContext.dispatch({ type: "SET_IS_AUTH", payload: false })
    }
  }, [profile, isError])
  return { isAuth: stateContext.state.isAuth, loading }
}

export default useAuth