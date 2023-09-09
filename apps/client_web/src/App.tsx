import "./App.css";
import Button from "./component/button";
import { useMutation } from "@tanstack/react-query";
import { logoutUserFn } from "./api/authApi";
import { useNavigate } from "react-router-dom";

function App() {

const navigate = useNavigate()

  const { mutate: logoutUser } = useMutation(
    async () => await logoutUserFn(),
  );

  const handleLogout = async () => {
    logoutUser();
    navigate("/login");
  };

  return <div className="App">
    <Button textContent="Logout" onClick={handleLogout} type="button" />
</div>;
}

export default App;
