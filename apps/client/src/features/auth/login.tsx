// Workaround : Import directly ts files instead
import { loginSchema } from '@skillcoop/schema/src';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import getGoogleUrl from '../../utils/get-google-url';
import { Link, useLocation } from 'react-router-dom';
import SocialButton from '../../components/social-link';
import Google from '../../assets/icon/Google';
import Page from '../../layouts/page';
import FormField from '../../components/form-field';
import Atsign from '../../assets/icon/Atsign';
import { Eye, EyeOff } from 'lucide-react';
import SeparatorLine from '../../components/seperator-line';
import Center from '../../layouts/center';
import ErrorContainer from '../../components/error';
import checkIfString from '../../utils/check-string';
import Button from '../../components/button';
import dompurify from 'dompurify';
import LoginDemoMode from './login-demo';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export type LoginUserData = {
  email: string;
  password: string;
};

function Login() {
  // const { t } = useTranslation('auth');
  // const location = useLocation();
  // const from = location.state?.from?.pathname || '/';

  /* This is awful"*/
  const { loginFn } = useAuth();
  // const loading = authProp?.loading;
  const loginFn = authProp?.loginFn;
  // const error = authProp?.error;
  // const loginError = authProp?.loginError;
  // const loginAttempts = authProp?.loginAttemps;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginUserData>({
  //   resolver: zodResolver(loginSchema),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // TODO : build a function who sanitize and
  // infer the type of the data
  const onSubmit = (data: LoginUserData) => {
    if (!loginFn) return;
    const sanitizeData = {
      email: dompurify.sanitize(data.email) as string,
      password: dompurify.sanitize(data.password) as string,
    };
    loginFn(sanitizeData);
  };

  return (
    <Page>
      <Center>
        <h1 className="py-4 text-center text-xl font-bold text-primary-1100">
          {"t('loginSkillcoop')"}
        </h1>
        <LoginDemoMode />
        <div
          className="flex w-[90%] max-w-lg 
              flex-col rounded-lg bg-base-light px-6 py-12"
        >
          {/* <SocialButton
            value={"t('loginWithGoogle')"}
            href={getGoogleUrl(from)}
          >
            <Google />
          </SocialButton>
          <SeparatorLine /> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-5"
          >
            <FormField
              type="text"
              name="email"
              label={"t('email')"}
              error={checkIfString(errors.email?.message)}
              register={register}
            >
              <Atsign />
            </FormField>
            <FormField
              type="password"
              name="password"
              label={"t('password')"}
              subicon={<EyeOff size={18} />}
              error={checkIfString(errors.password?.message)}
              register={register}
            >
              <Eye size={18} />
            </FormField>
            {/* <Link
              to="/forgot-password"
              className="duration-600 cursor-pointer  self-end text-xs
                 text-primary-1100 transition-all hover:text-primary-1100
                   hover:underline"
            >
              {"t('forgotPassword')"} ?
            </Link> */}
            <Button
              textContent="{t('login')}"
              // isLoading={loading}
              type="submit"
            />
            {/* <ErrorContainer
              errorValue={error || loginError}
              attempsCount={loginAttempts}
            /> */}
          </form>
        </div>
        {/* <p className="py-2 text-xs">
          {"t('dontHaveAccount')"} ?{' '}
          <Link to="/register" className="font-bold text-primary-1000">
            {"t('joinUs')"}
          </Link>
        </p> */}
      </Center>
    </Page>
  );
}
export default Login;
