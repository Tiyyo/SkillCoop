import { useMutation } from '@tanstack/react-query';
import { loginUserFn } from '../../api/api.fn';
import schema from 'schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import getGoogleUrl from '../../utils/get-google-url';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialButton from '../../component/social-link';
import Google from '../../assets/icon/Google';
import Page from '../../layout/page';
import FormField from '../../component/form-field';
import { useEffect } from 'react';
import Atsign from '../../assets/icon/Atsign';
import EyeIcon from '../../assets/icon/Eye';
import EyeSlash from '../../assets/icon/EyeSlash';
import SeparatorLine from '../../component/seperator-line';
import Center from '../../layout/center';
import ErrorContainer from '../../component/error';
import { useApp } from '../../store/app.store';
import toast from '../../utils/toast';
import ReturnBtn from '../../component/return';
import checkIfString from '../../utils/check-string';
import Button from '../../component/button';

export type LoginUserData = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const { setIsAuth } = useApp();
  const {
    mutate: loginUser,
    isLoading: loading,
    isSuccess,
    error,
  } = useMutation((userData: LoginUserData) => loginUserFn(userData));
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { loginSchema } = schema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // TODO : find correct typing
  const onSubmit = (data: any) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isSuccess && !loading) {
      console.log('login has been successful');
      navigate('/');
      // setIsAuth(true);
      toast.success('Welcome back!');
    }
  }, [isSuccess, loading, setIsAuth]);

  return (
    <Page>
      <ReturnBtn to="/" />
      <Center>
        <h1 className="py-4 text-xl font-bold text-primary-1100 text-center">
          Log in to SkillCoop
        </h1>
        <div className="flex flex-col w-[90%] max-w-lg bg-base-light py-12 px-6 rounded-lg">
          <SocialButton
            value="Login with Google"
            href={getGoogleUrl(from)}>
            <Google />
          </SocialButton>
          <SeparatorLine />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-5">
            <FormField
              type="text"
              name="email"
              label="Email"
              error={checkIfString(errors.email?.message)}
              register={register}>
              <Atsign />
            </FormField>
            <FormField
              type="password"
              name="password"
              label="Password"
              subicon={<EyeSlash />}
              error={checkIfString(errors.password?.message)}
              register={register}>
              <EyeIcon />
            </FormField>
            <Button
              textContent="Login"
              isLoading={loading}
              type="submit"
            />
            <ErrorContainer errorValue={(error as any)?.response?.data.error} />
          </form>
        </div>
        <p className="text-xs py-2">
          Don't have an account ?{' '}
          <Link
            to="/register"
            className="text-primary-1000 font-bold">
            Join us
          </Link>
        </p>
      </Center>
    </Page>
  );
}
export default Login;
