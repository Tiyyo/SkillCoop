import ErrorNotification from '../../../components/error/notification';
import { useTranslation } from 'react-i18next';
import FormField from '../../../components/form-field';
import Button from '../../../components/button';

type BeforeSendResetEmailProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  countRender: number;
  error: string | undefined;
};

function BeforeSendResetEmail({
  onSubmit,
  isLoading,
  countRender,
  error,
}: BeforeSendResetEmailProps) {
  const { t } = useTranslation('auth');

  return (
    <form
      className="flex w-3/4 max-w-lg flex-col items-center gap-y-5 
            rounded-lg bg-base-light p-6"
      onSubmit={onSubmit}
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
  );
}

export default BeforeSendResetEmail;
