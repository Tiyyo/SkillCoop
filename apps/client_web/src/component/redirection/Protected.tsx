import { useStateContext } from "../../context/app.context";
import HomePage from "../../feature/home-page/HomePage";
import LoadingPage from "../loading-page";


function Protected({ children }: { children: React.ReactNode }) {
  const stateContext = useStateContext();

  if(stateContext.loading) return (<LoadingPage/>)

  return stateContext.state.isAuth ? <>{children}</> : <HomePage/>;
}

export default Protected;
