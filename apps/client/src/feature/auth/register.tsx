import { useMutation } from '@tanstack/react-query';
import { signUpUserFn } from '../../api/api.fn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerSchema } from '@skillcoop/schema/src';
import Page from '../../layout/page';
import Center from '../../layout/center';
import SocialButton from '../../component/social-link';
import Google from '../../assets/icon/Google';
import getGoogleUrl from '../../utils/get-google-url';
import SeparatorLine from '../../component/seperator-line';
import FormField from '../../component/form-field';
import Button from '../../component/button';
import type { RegisterUser } from '@skillcoop/types/src';
import { useState } from 'react';
import checkIfString from '../../utils/check-string';
import ErrorContainer from '../../component/error';
import ErrorNotification from '../../component/error/notification';
import { AtSign, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LoginDemoMode from './login-demo';
import usePasswordMeter from '../../hooks/usePasswordMeter';
import PasswordStrengthMeter from '../../component/password-strenght-meter';

function Register() {
  const { t } = useTranslation('auth');
  const { currentPassword, trackPasswordChangeValue } = usePasswordMeter();
  const { mutate: signUpUser, isLoading } = useMutation({
    mutationFn: async (userData: RegisterUser) => signUpUserFn(userData),
    onSuccess: () => {
      navigate('/verify-email', { state: { email: currentEmail } });
    },
    onError: () => {
      setResponseErrorServer(t('couldNotCreateAccount'));
      setRenderCount((prev) => prev + 1);
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [responseErrorServer, setResponseErrorServer] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterUser) => {
    const termAndServiceInString = data.termAndService ? 'on' : 'off';
    setCurrentEmail(data.email);
    signUpUser({
      email: data.email,
      password: data.password,
      confirmedPassword: data.confirmedPassword,
      termAndService: termAndServiceInString,
    });
  };

  return (
    <Page>
      <Center>
        <h1 className="py-4 text-xl font-bold text-primary-1100 text-center">
          {t('createSkillcoop')}
        </h1>
        <LoginDemoMode />
        <div
          className="flex flex-col w-[90%] max-w-lg bg-base-light 
          py-7 px-6 rounded-lg"
        >
          <ErrorNotification
            message={responseErrorServer}
            triggerRender={renderCount}
          />
          <SocialButton
            value={t('continueWithGoogle')}
            href={getGoogleUrl(from)}
          >
            <Google />
          </SocialButton>
          <SeparatorLine />
          <form
            className="flex flex-col items-center gap-y-5"
            onSubmit={handleSubmit(onSubmit)}
            onChange={trackPasswordChangeValue}
          >
            <FormField
              type="email"
              name="email"
              label={t('email')}
              error={checkIfString(errors.email?.message)}
              register={register}
            >
              <AtSign size={16} />
            </FormField>
            <FormField
              type="password"
              name="password"
              label={t('password')}
              subicon={<EyeOff size={16} />}
              error={checkIfString(errors.password?.message)}
              register={register}
            >
              <Eye size={16} />
            </FormField>
            <PasswordStrengthMeter password={currentPassword} />
            <FormField
              type="password"
              name="confirmedPassword"
              label={t('confirmYourPassword')}
              subicon={<EyeOff size={16} />}
              //TODO: find the right type
              error={checkIfString((errors as any).confirm?.message)}
              register={register}
            >
              <Eye size={16} />
            </FormField>
            <div className="text-xxs flex items-start self-start">
              <p>{t('passwordContains')}</p>
              <ul className="list-disc ml-7">
                <li>8 {t('characters')}</li>
                <li>1 {t('number')}</li>
                <li>1 {t('lowercaseLetter')}</li>
                <li>1 {t('uppercaseLetter')}</li>
                <li>1 {t('specialCharacter')}</li>
              </ul>
            </div>
            <label
              htmlFor="termsAndService"
              className="text-xs text-opacity-70 text-center inline "
            >
              <input
                type="checkbox"
                value="on"
                className="mr-1"
                {...register('termAndService')}
              />
              {t('agreeToTerms')}
              <Link
                to="/terms-and-service"
                className="underline underline-offset-2 ml-1 
              text-primary-800 inline"
              >
                {t('landing-page:termsAndConditions')}
              </Link>
            </label>
            <ErrorContainer
              errorValue={
                errors.termAndService ? t('youHaveToAcceptTerms') : ''
              }
            />
            <Button
              textContent={t('register')}
              type="submit"
              isLoading={isLoading}
            />
          </form>
        </div>
        <p className="text-xs py-2">
          {t('alreadyHaveAccount')} ?{' '}
          <Link to="/login" className="text-primary-1000 font-bold">
            {t('logIn')}
          </Link>
        </p>
      </Center>
    </Page>
  );
}

export default Register;
