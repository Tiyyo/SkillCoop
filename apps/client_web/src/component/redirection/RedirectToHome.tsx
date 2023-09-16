import { useStateContext } from "../../context/app.context";
import { Navigate} from "react-router-dom";

function RedirectToHome({ children }: { children: React.ReactNode }) {
  const stateContext = useStateContext();

  // if(stateContext.loading) return (<div>Loading...</div>)

  return stateContext.state.isAuth ?  <Navigate to="/" /> : <>{children}</>;
}

export default RedirectToHome;
