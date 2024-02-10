import Page from '../../../shared/layouts/page';
import Center from '../../../shared/layouts/center';
import envelope from '../../../assets/svg/envelope.svg';
import paperPlane from '../../../assets/svg/paper-plane.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import capitalize from '../../../utils/capitalize';
import useVerifyEmail from '../hooks/useVerifyEmail';

function VerifyEmail() {
  const { t } = useTranslation('auth');
  const { handleClick } = useVerifyEmail();

  return (
    <>
      <Page>
        <nav
          className="flex w-full items-center justify-end gap-6 px-4 
          py-3 text-sm font-semibold text-primary-1100"
        >
          <Link to="/">
            <p className="cursor-pointer hover:text-primary-600">
              {capitalize(t('home'))}
            </p>
          </Link>
        </nav>
        <Center>
          <div
            className="relative flex max-w-[80%] flex-col justify-center
           gap-8 rounded-xl bg-box px-8 py-12 text-lg 
            font-bold text-primary-1000 shadow-lg"
          >
            <img
              src={paperPlane}
              className="absolute -right-2 -top-2.5 
              aspect-square h-11 object-contain"
            />
            <h1 className="text-center">{t('emailHasBeenSent')}</h1>
            <img src={envelope} className="h-14" />
            <p className="text-center">{t('pleaseVerifyEmail')}</p>
          </div>
          <p className="max-w-[80%] py-4 text-center text-xs text-primary-1100">
            {t('emptyMailbox')} ?{' '}
            <span
              className="cursor-pointer text-accent-700"
              onClick={handleClick}
            >
              {t('clickToResendEmail')}
            </span>
          </p>
        </Center>
      </Page>
    </>
  );
}

export default VerifyEmail;
