import envelope from '../../../assets/svg/envelope.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AfterSendResetEmail() {
  const { t } = useTranslation('auth');

  return (
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
  );
}

export default AfterSendResetEmail;
