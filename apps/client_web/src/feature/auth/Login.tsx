import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "../../api/authApi";
import schema from 'schema'
import { useStateContext } from "../../context/app.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getGoogleUrl from "../../utils/getGoogleUrl";
import { useLocation } from "react-router-dom";

export type LoginUserData = {
  email: string;
  password: string; 
}

function Login() {
  const {
    mutate: loginUser,
  } = useMutation((userData : LoginUserData) => loginUserFn(userData));
  const stateContext = useStateContext()
  const location = useLocation()
  console.log(location.pathname);
  const from = location.state?.from?.pathname || "/" ;
  const {loginSchema} = schema
  const {register , handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(loginSchema)})



  const onSubmit = (data) => {
    loginUser(data);
    stateContext.dispatch({ type: "SET_IS_AUTH", payload: true })
  };


  return (
    <>
      <div>Here goes login page</div>
      <a href={getGoogleUrl(from)}><button>Login with Google</button></a>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input  type="text" placeholder="email" {...register('email')}/>
        <input type="password" placeholder="password" {...register('password')} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
export default Login;
