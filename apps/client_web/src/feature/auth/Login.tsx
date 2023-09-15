import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "../../api/authApi";
import schema from "schema";
import { useStateContext } from "../../context/app.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getGoogleUrl from "../../utils/getGoogleUrl";
import { useLocation } from "react-router-dom";
import SocialButton from "../../component/social-link";
import Google from "../../assets/icon/Google";
import Page from "../../layout/Page";
import FormField from "../../component/form-field";
import { useEffect } from "react";
import Atsign from "../../assets/icon/Atsign";
import EyeIcon from "../../assets/icon/Eye";
import EyeSlash from "../../assets/icon/EyeSlash";
import SeparatorLine from "../../component/seperator-line";

export type LoginUserData = {
  email: string;
  password: string;
};

function Login() {
  const {
    mutate: loginUser,
    isLoading,
    isSuccess,
  } = useMutation((userData: LoginUserData) => loginUserFn(userData));
  const loading = isLoading 
  const stateContext = useStateContext();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { loginSchema } = schema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isSuccess && !loading) {
      stateContext.dispatch({ type: "SET_IS_AUTH", payload: true });
    }
  }, [isSuccess, loading]);

  return (
    <Page>
      <a href={getGoogleUrl(from)}>
        <SocialButton value="Login with Google">
          <Google />
        </SocialButton>
      </a>
      <SeparatorLine/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          type="text"
          name="email"
          label="Email"
          register={register}
        >
          <Atsign />
        </FormField>
        <FormField
          type="password"
          name="password"
          label="Password"
          subicon={<EyeSlash/>}
          register={register}
        >
          <EyeIcon />
        </FormField>
        <button type="submit">Login</button>
      </form>
    </Page>
  );
}
export default Login;
