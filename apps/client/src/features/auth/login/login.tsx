// Workaround : Import directly ts files instead
import { loginSchema } from '@skillcoop/schema/src';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import getGoogleUrl from '../../../shared/utils/get-google-url';
import { Link, useLocation } from 'react-router-dom';
import SocialButton from '../../../shared/components/social-link';
import Google from '../../../assets/icon/Google';
import Page from '../../../shared/layouts/page';
import FormField from '../../../shared/components/form-field';
import Atsign from '../../../assets/icon/Atsign';
import { Eye, EyeOff } from 'lucide-react';
import SeparatorLine from '../../../shared/components/seperator-line';
import Center from '../../../shared/layouts/center';
import ErrorContainer from '../../../shared/components/error';
import checkIfString from '../../../shared/utils/check-string';
import Button from '../../../shared/components/button';
import dompurify from 'dompurify';
import LoginDemoMode from '../login-demo/login-demo';
import useAuth from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import useAuthRedirection from '../hooks/useAuthRedirection';

export type LoginUserData = {
  email: string;
  password: string;
};

function Login() {
  const { t } = useTranslation('auth');
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    loginFn,
    loading,
    isAuthenticated,
    isFristConnection,
    responseGetProfile,
    error,
    loginError,
    loginAttempts,
  } = useAuth();

  useAuthRedirection({
    isAuthenticated,
    isFristConnection,
    responseGetProfile,
    loading,
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
    if (!loginFn) return;
    const sanitizeData = {
      email: dompurify.sanitize(data.email).trim() as string,
      password: dompurify.sanitize(data.password) as string,
    };
    loginFn(sanitizeData);
  };

  return (
    <Page>
      <Link
        to="/"
        className="self-end px-8 py-4 text-sm font-semibold text-primary-1100"
      >
        {t('system:home')}
      </Link>
      <Center>
        <h1 className="py-4 text-center text-xl font-bold text-primary-1100">
          {t('loginSkillcoop')}
        </h1>
        <LoginDemoMode />
        <div
          className="flex w-[90%] max-w-lg 
              flex-col rounded-lg bg-base-light px-6 py-12"
        >
          <SocialButton value={t('loginWithGoogle')} href={getGoogleUrl(from)}>
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
              label={t('email')}
              error={checkIfString(errors.email?.message)}
              register={register}
            >
              <Atsign />
            </FormField>
            <FormField
              type="password"
              name="password"
              label={t('password')}
              subicon={<EyeOff size={18} />}
              error={checkIfString(errors.password?.message)}
              register={register}
            >
              <Eye size={18} />
            </FormField>
            <Link
              to="/forgot-password"
              className="duration-600 cursor-pointer self-end text-xs
                 text-grey-sub-text transition-all
                   hover:text-primary-1100 hover:underline"
            >
              {t('forgotPassword')} ?
            </Link>
            <Button
              textContent={t('login')}
              isLoading={loading}
              type="submit"
            />
            <ErrorContainer
              errorValue={error || loginError}
              attempsCount={loginAttempts}
            />
          </form>
        </div>
        <p className="py-2 text-xs text-primary-1100">
          {t('dontHaveAccount')} ?{' '}
          <Link to="/register" className="font-bold text-primary-1000">
            {t('joinUs')}
          </Link>
        </p>
      </Center>
    </Page>
  );
}
export default Login;
