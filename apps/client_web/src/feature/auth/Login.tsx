import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "../../api/authApi";

export type LoginUserData = {
  email: string;
  password: string; 
}

function Login() {
  const {
    mutate: loginUser,
  } = useMutation((userData : LoginUserData) => loginUserFn(userData));

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    loginUser(data);
  };
  return (
    <>
      <div>Here goes login page</div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
export default Login;
