import { useStateContext } from "../../context/app.context";
import { Navigate} from "react-router-dom";
import LoadingPage from "../loading-page";

function RedirectToHome({ children }: { children: React.ReactNode }) {
  const stateContext = useStateContext();

  if(stateContext.loading) return <LoadingPage/>

  return stateContext.state.isAuth ?  <Navigate to="/" /> : <>{children}</>;
}

export default RedirectToHome;
