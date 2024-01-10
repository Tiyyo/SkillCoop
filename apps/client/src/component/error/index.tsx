import { useTranslation } from 'react-i18next';

function displayErrorMessage(errorValue: string | undefined): string {
  const { t } = useTranslation('toast');
  if (!errorValue) return '';
  if (errorValue.includes('Email not verified')) {
    t('emailAlreadyExists');
    return t('pleaseVerifyEmail') + ' !';
  }
  if (errorValue.includes('Email already exist')) {
    return t('emailAlreadyExists');
  }
  if (
    errorValue.includes('Password') ||
    errorValue.includes("Can't find any user") ||
    errorValue.includes('Bad credentials')
  ) {
    return t('badCredentials') + ' !';
  }
  return t(errorValue);
}

function ErrorContainer({ errorValue }: { errorValue: string | undefined }) {
  return (
    <p className="text-error text-xs font-semibold">
      {displayErrorMessage(errorValue)}
    </p>
  );
}
export default ErrorContainer;
