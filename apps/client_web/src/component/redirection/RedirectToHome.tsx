import { useStateContext } from "../../context/app.context";
import { Navigate} from "react-router-dom";

function RedirectToHome({ children }: { children: React.ReactNode }) {
  const stateContext = useStateContext();

  return stateContext.state.isAuth ?  <Navigate to="/" /> : <>{children}</>;
}

export default RedirectToHome;
