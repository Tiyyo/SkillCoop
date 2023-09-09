import { useStateContext } from "../../context/app.context";
import { Navigate} from "react-router-dom";

function Protected({ children }: { children: React.ReactNode }) {
  const stateContext = useStateContext();

  console.log(stateContext.state.isAuth );

  return stateContext.state.isAuth ? <>{children}</> : <Navigate to="/login" />;
}

export default Protected;
