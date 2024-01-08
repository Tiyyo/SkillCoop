import { useMutation } from '@tanstack/react-query';
import Button from '../../component/button';
import FormField from '../../component/form-field';
import Center from '../../layout/center';
import Page from '../../layout/page';
import { forgotPasswordFn } from '../../api/api.fn';
import { emailSchema } from 'schema/ts-schema';
import { useState } from 'react';
import envelope from '../../assets/svg/envelope.svg';
import { Link } from 'react-router-dom';
import ErrorNotification from '../../component/error/notification';
import { useTranslation } from 'react-i18next';

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
        <h1 className="text-lg my-4 font-semibold opacity-30 text-primary-1100">
          {t('resetYourPassword')}
        </h1>
        {/* TODO: refactor make this form a component and include his state */}
        {!hasBeenSent ? (
          <form
            className="flex flex-col items-center gap-y-5 p-6 bg-base-light 
            max-w-lg rounded-sm w-3/4"
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
            className="flex flex-col items-center gap-y-5 p-6 bg-base-light 
            max-w-lg rounded-sm w-3/4 text-center text-sm"
          >
            <p className="text-xs font-light text-center">
              {t('ifThereIsAnAccount')}
            </p>
            <img src={envelope} className="h-14" alt="envelope" />
            <p>
              {t('emailHasBeenSent')}, {t('youCanNowResetPassword')}
            </p>
            <p>{t('theReceptionMayTakeFewMinutes')}</p>

            <Link
              to="/login"
              className="py-2 cursor-pointer duration-200 
              transition-all rounded-md bg-primary-800 hover:bg-primary-900
             text-white  px-3 w-[70%] 
                 max-w-xs font-bold uppercase shadow-sm tracking-wide"
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
