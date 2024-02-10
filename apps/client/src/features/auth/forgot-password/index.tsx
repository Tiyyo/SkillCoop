import Center from '../../../layouts/center';
import Page from '../../../layouts/page';
import { useTranslation } from 'react-i18next';
import BeforeSendResetEmail from './before-send-email';
import AfterSendResetEmail from './after-send-email';
import useForgotPassword from '../hooks/useForgotPassword';

function ForgotPassword() {
  const { t } = useTranslation('auth');
  const { hasBeenSent, error, countRender, isLoading, handleSubmit } =
    useForgotPassword();

  return (
    <Page>
      <Center>
        <h1 className="my-4 text-lg font-semibold text-primary-1100 opacity-90">
          {t('resetYourPassword')}
        </h1>
        {!hasBeenSent ? (
          <BeforeSendResetEmail
            onSubmit={handleSubmit}
            error={error}
            countRender={countRender}
            isLoading={isLoading}
          />
        ) : (
          <AfterSendResetEmail />
        )}
      </Center>
    </Page>
  );
}

export default ForgotPassword;
