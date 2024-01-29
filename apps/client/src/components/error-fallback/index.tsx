import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ErrorFallback() {
  const { t } = useTranslation('toast');
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <p className="text-md text-primary-1100">{t('unexpectedError')}</p>
      <Link
        to="/"
        className="cursor-pointer text-xs text-primary-1000 
      duration-200 hover:text-primary-700"
      >
        {t('backToHomepage')}
      </Link>
    </div>
  );
}

export default ErrorFallback;
