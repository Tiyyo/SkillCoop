import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "../../api/authApi";
import schema from "schema";
import { useStateContext } from "../../context/app.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getGoogleUrl from "../../utils/getGoogleUrl";
import { Link, useLocation } from "react-router-dom";
import SocialButton from "../../component/social-link";
import Google from "../../assets/icon/Google";
import Page from "../../layout/Page";
import FormField from "../../component/form-field";
import { useEffect } from "react";
import Atsign from "../../assets/icon/Atsign";
import EyeIcon from "../../assets/icon/Eye";
import EyeSlash from "../../assets/icon/EyeSlash";
import SeparatorLine from "../../component/seperator-line";
import Center from "../../layout/Center";
import ErrorContainer from "../../component/error";

export type LoginUserData = {
  email: string;
  password: string;
};

function Login() {
  const {
    mutate: loginUser,
    isLoading,
    isSuccess,
    error 
  } = useMutation((userData: LoginUserData) => loginUserFn(userData));
  const loading = isLoading;
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
      <Center>
        <h1 className="py-4 text-xl font-bold text-primary-1100 text-center">Log in to SkillCoop</h1>
        <div className="flex flex-col w-[90%] max-w-lg bg-base-light py-12 px-6 rounded-lg">
            <SocialButton value="Login with Google" href={getGoogleUrl(from)}>
              <Google />
            </SocialButton>
          <SeparatorLine />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-5"
          >
            <FormField
              type="text"
              name="email"
              label="Email"
              error={errors.email?.message}
              register={register}
            >
              <Atsign />
            </FormField>
            <FormField
              type="password"
              name="password"
              label="Password"
              subicon={<EyeSlash />}
              error={errors.password?.message}
              register={register}
            >
              <EyeIcon />
            </FormField>
            <button
              type="submit"
              className="bg-primary-800 hover:bg-primary-900 transition-colors text-white py-2 px-3 w-[70%] max-w-xs rounded-md cursor-pointer font-bold uppercase shadow-sm"
            >
              Login
            </button>
            <ErrorContainer errorValue={error?.response?.data.error}/>
          </form>
        </div>
          <p className="text-xs py-2">Don't have an account ? <Link to="/register" className="text-primary-1000 font-bold">Join us</Link></p>
      </Center>
    </Page>
  );
}
export default Login;
