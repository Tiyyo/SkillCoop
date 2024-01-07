import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ErrorFallback() {
  const { t } = useTranslation('toast');
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-sm text-primary-1100">{t('unexpectedError')}</p>
      <Link to="/" className="text-xs">
        {t('backToHomepage')}
      </Link>
    </div>
  );
}

export default ErrorFallback;
