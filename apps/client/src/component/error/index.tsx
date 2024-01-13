import { useTranslation } from 'react-i18next';

function displayErrorMessage(
  errorValue: string | undefined,
  attempsCount?: number,
): string {
  const { t } = useTranslation('toast');
  if (!errorValue) return '';
  if (errorValue.includes('has been blocked')) {
    return t('yourAccountHasBeenBlocked');
  }
  if (errorValue.includes('Bad credentials')) {
    return t('badCredentials');
  }
  if (errorValue.includes('has not been verified yet')) {
    return t('yourAccountHasNotBeenVerified');
  }
  if (attempsCount && errorValue.includes('You have only')) {
    return t('youHaveOnlyXLeft', { count: 5 - attempsCount });
  }
  return t(errorValue);
}

function ErrorContainer({
  errorValue,
  attempsCount,
}: {
  errorValue: string | undefined;
  attempsCount?: number;
}) {
  return (
    <p className="text-error text-center text-xs font-semibold">
      {displayErrorMessage(errorValue, attempsCount)}
    </p>
  );
}
export default ErrorContainer;
