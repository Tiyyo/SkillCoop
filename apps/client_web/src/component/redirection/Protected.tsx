import { useStateContext } from "../../context/app.context";
import { Navigate} from "react-router-dom";

function Protected({ children }: { children: React.ReactNode }) {
  const stateContext = useStateContext();

  if(stateContext.loading) return (<div>Loading...</div>)

  return stateContext.state.isAuth ? <>{children}</> : <Navigate to="/login" />;
}

export default Protected;
