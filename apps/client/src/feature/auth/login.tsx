import { useMutation } from '@tanstack/react-query';
import { loginUserFn } from '../../api/api.fn';
// Workaround : Create a ts-schema folder
//in the schema lib to avoid rollup plugin error
import { loginSchema } from 'schema/ts-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import getGoogleUrl from '../../utils/get-google-url';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialButton from '../../component/social-link';
import Google from '../../assets/icon/Google';
import Page from '../../layout/page';
import FormField from '../../component/form-field';
import Atsign from '../../assets/icon/Atsign';
import { Eye, EyeOff } from 'lucide-react';
import SeparatorLine from '../../component/seperator-line';
import Center from '../../layout/center';
import ErrorContainer from '../../component/error';
import ReturnBtn from '../../component/return';
import checkIfString from '../../utils/check-string';
import Button from '../../component/button';
import dompurify from 'dompurify';

export type LoginUserData = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const {
    mutate: loginUser,
    isLoading: loading,
    error,
  } = useMutation({
    mutationFn: async (userData: LoginUserData) => loginUserFn(userData),
    onSuccess: () => {
      navigate('/', { replace: true });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginSchema),
  });

  // TODO : build a function who sanitize and
  // infer the type of the data
  const onSubmit = (data: LoginUserData) => {
    const sanitizeData = {
      email: dompurify.sanitize(data.email) as string,
      password: dompurify.sanitize(data.password) as string,
    };
    loginUser(sanitizeData);
  };

  return (
    <Page>
      <ReturnBtn to="/" />
      <Center>
        <h1 className="py-4 text-xl font-bold text-primary-1100 text-center">
          Log in to SkillCoop
        </h1>
        <div
          className="flex flex-col w-[90%] 
              max-w-lg bg-base-light py-12 px-6 rounded-lg"
        >
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
              error={checkIfString(errors.email?.message)}
              register={register}
            >
              <Atsign />
            </FormField>
            <FormField
              type="password"
              name="password"
              label="Password"
              subicon={<EyeOff size={18} />}
              error={checkIfString(errors.password?.message)}
              register={register}
            >
              <Eye size={18} />
            </FormField>
            <Link
              to="/forgot-password"
              className="text-xs text-primary-1100  self-end cursor-pointer
                 hover:text-primary-1100 hover:underline duration-600
                   transition-all"
            >
              Forgot password ?
            </Link>
            <Button textContent="Login" isLoading={loading} type="submit" />
            <ErrorContainer
              errorValue={(error as any)?.response?.data.error} //eslint-disable-line
            />
          </form>
        </div>
        <p className="text-xs py-2">
          Don't have an account ?{' '}
          <Link to="/register" className="text-primary-1000 font-bold">
            Join us
          </Link>
        </p>
      </Center>
    </Page>
  );
}
export default Login;
