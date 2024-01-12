import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ErrorFallback() {
  const { t } = useTranslation('toast');
  return (
    <div className="flex flex-grow flex-col justify-center items-center gap-4">
      <p className="text-md text-primary-1100">{t('unexpectedError')}</p>
      <Link
        to="/home"
        className="text-xs cursor-pointer text-primary-1000 
      hover:text-primary-700 duration-200"
      >
        {t('backToHomepage')}
      </Link>
    </div>
  );
}

export default ErrorFallback;
