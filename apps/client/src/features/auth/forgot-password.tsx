import { useMutation } from '@tanstack/react-query';
import FormField from '../../components/form-field';
import Center from '../../layouts/center';
import Page from '../../layouts/page';
import { forgotPasswordFn } from '../../api/api.fn';
import { emailSchema } from '@skillcoop/schema/src';
import { useState } from 'react';
import envelope from '../../assets/svg/envelope.svg';
import { Link } from 'react-router-dom';
import ErrorNotification from '../../components/error/notification';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button';

function ForgotPassword() {
  const { t } = useTranslation('auth');
  const [hasBeenSent, setHasBeenSent] = useState(false);
  const [error, setError] = useState('');
  const [countRender, setCountRender] = useState(0);
  const { mutate: sendEmailWithResetLink, isLoading } = useMutation({
    mutationFn: async (email: string) => {
      return forgotPasswordFn(email);
    },
    onSuccess: () => {
      setHasBeenSent(true);
    },
    onError: () => {
      setError(t('toast:thisEmailIsNotAssociated'));
      setCountRender((prev) => prev + 1);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: e.currentTarget.email.value,
    };
    const isValid = emailSchema.safeParse(data);
    if (!isValid.success) {
      setError(t('toast:thisIsNotAValidEmail'));
    } else {
      sendEmailWithResetLink(data.email);
    }
  };

  //TODO : refactor this page
  return (
    <Page>
      <Center>
        <h1 className="my-4 text-lg font-semibold text-primary-1100 opacity-90">
          {t('resetYourPassword')}
        </h1>
        {/* TODO: refactor make this form a component and include his state */}
        {!hasBeenSent ? (
          <form
            className="flex w-3/4 max-w-lg flex-col items-center gap-y-5 
            rounded-lg bg-base-light p-6"
            onSubmit={handleSubmit}
          >
            <p className="self-start text-sm text-primary-1100">
              {t('enterMailAssociated')}
            </p>
            <p className="self-start text-sm text-primary-1100">
              {t('ifYouHaveVerifiedAccound')}
            </p>
            <ErrorNotification message={error} triggerRender={countRender} />
            <FormField name="email" label={t('email')} />
            <Button
              textContent={t('resetMyPassword')}
              type="submit"
              className="text-sm"
              isLoading={isLoading}
            />
          </form>
        ) : (
          <div
            className="flex w-3/4 max-w-lg flex-col items-center gap-y-5 
            rounded-sm bg-base-light p-6 text-center text-sm"
          >
            <p className="text-center text-xs font-light">
              {t('ifThereIsAnAccount')}
            </p>
            <img src={envelope} className="h-14" alt="envelope" />
            <p>
              {t('emailHasBeenSent')}, {t('youCanNowResetPassword')}
            </p>
            <p>{t('theReceptionMayTakeFewMinutes')}</p>

            <Link
              to="/login"
              className="w-[70%] max-w-xs cursor-pointer rounded-md 
            bg-primary-800 px-3 py-2 font-bold  uppercase tracking-wide 
            text-white shadow-sm transition-all duration-200 
              hover:bg-primary-900"
            >
              {t('understood')}
            </Link>
          </div>
        )}
      </Center>
    </Page>
  );
}

export default ForgotPassword;
