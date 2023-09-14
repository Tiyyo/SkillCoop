import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "../../api/authApi";
import schema from 'schema'
import { useStateContext } from "../../context/app.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getGoogleUrl from "../../utils/getGoogleUrl";
import { useLocation } from "react-router-dom";
import SocialButton from "../../component/social-link";
import Google from "../../assets/Google";
import Page from "../../layout/Page";
import FormField from "../../component/form-field";

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
  const from = location.state?.from?.pathname || "/" ;
  const {loginSchema} = schema
  const {register , handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(loginSchema)})

  const onSubmit = (data) => {
    loginUser(data);
    stateContext.dispatch({ type: "SET_IS_AUTH", payload: true })
  };




  return (
    <Page>
      <div>Here goes login page</div>
      
      <a href={getGoogleUrl(from)}>
        <SocialButton value="Login with Google">
          <Google/>
        </SocialButton>
      </a>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField type="text" placeholder="email" register={register}/>
        <FormField type="password" placeholder="password" register={register}/>
        <button type="submit">Login</button>
      </form>
   </Page>
  );
}
export default Login;
