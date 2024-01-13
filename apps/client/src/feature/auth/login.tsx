// Workaround : Import directly ts files instead
import { loginSchema } from '@skillcoop/schema/src';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import getGoogleUrl from '../../utils/get-google-url';
import { Link, useLocation } from 'react-router-dom';
import SocialButton from '../../component/social-link';
import Google from '../../assets/icon/Google';
import Page from '../../layout/page';
import FormField from '../../component/form-field';
import Atsign from '../../assets/icon/Atsign';
import { Eye, EyeOff } from 'lucide-react';
import SeparatorLine from '../../component/seperator-line';
import Center from '../../layout/center';
import ErrorContainer from '../../component/error';
import checkIfString from '../../utils/check-string';
import Button from '../../component/button';
import dompurify from 'dompurify';
import { useTranslation } from 'react-i18next';
import LoginDemoMode from './login-demo';
import useAuth from '../../hooks/useAuth';

export type LoginUserData = {
  email: string;
  password: string;
};

function Login() {
  const { t } = useTranslation('auth');
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  /* This is awful"*/
  const authProp = useAuth();
  const loading = authProp?.loading;
  const loginFn = authProp?.loginFn;
  const error = authProp?.error;
  const loginError = authProp?.loginError;
  const loginAttempts = authProp?.loginAttemps;

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
      email: dompurify.sanitize(data.email) as string,
      password: dompurify.sanitize(data.password) as string,
    };
    loginFn(sanitizeData);
  };

  return (
    <Page>
      <Center>
        <h1 className="py-4 text-xl font-bold text-primary-1100 text-center">
          {t('loginSkillcoop')}
        </h1>
        <LoginDemoMode />
        <div
          className="flex flex-col w-[90%] 
              max-w-lg bg-base-light py-12 px-6 rounded-lg"
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
              className="text-xs text-primary-1100  self-end cursor-pointer
                 hover:text-primary-1100 hover:underline duration-600
                   transition-all"
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
        <p className="text-xs py-2">
          {t('dontHaveAccount')} ?{' '}
          <Link to="/register" className="text-primary-1000 font-bold">
            {t('joinUs')}
          </Link>
        </p>
      </Center>
    </Page>
  );
}
export default Login;
