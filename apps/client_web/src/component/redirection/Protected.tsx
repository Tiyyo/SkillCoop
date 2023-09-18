import { useStateContext } from "../../context/app.context";
import HomePage from "../../feature/home-page/HomePage";

function Protected({ children }: { children: React.ReactNode }) {
  const stateContext = useStateContext();

  // if(stateContext.loading) return (<div>Loading...</div>)

  return stateContext.state.isAuth ? <>{children}</> : <HomePage/>;
}

export default Protected;
