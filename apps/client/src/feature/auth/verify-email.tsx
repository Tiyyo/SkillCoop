import Page from '../../layout/page';
import Center from '../../layout/center';
import envelope from '../../assets/svg/envelope.svg';
import paperPlane from '../../assets/svg/paper-plane.svg';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { sendEmailVerifyFn } from '../../api/api.fn';
import toast from '../../utils/toast';
import { emailSchema } from 'schema/ts-schema';
import { useTranslation } from 'react-i18next';
import capitalize from '../../utils/capitalize';

function VerifyEmail() {
  const { t } = useTranslation('auth');
  const location = useLocation();
  const email = location.state?.email;
  const { mutate: sendEmailVerify } = useMutation({
    mutationFn: async (email: string) => {
      return sendEmailVerifyFn(email);
    },
    onSuccess: () => {
      toast.emailSent();
    },
  });

  const handleClick = () => {
    const isValidEmail = emailSchema.safeParse(email);
    if (!isValidEmail.success) {
      sendEmailVerify(email);
    }
  };

  return (
    <>
      <Page>
        <nav
          className="text-sm flex items-center gap-6 w-full justify-end 
          font-semibold text-primary-1100 py-3 px-4"
        >
          <Link to="/">
            <p className="hover:text-primary-600 cursor-pointer">
              {capitalize(t('home'))}
            </p>
          </Link>
        </nav>
        <Center>
          <div
            className="relative flex flex-col font-bold text-primary-1000 
            justify-center gap-8 text-lg bg-box px-8 py-12 shadow-lg rounded-xl"
          >
            <img
              src={paperPlane}
              className="object-contain aspect-square h-11 
              absolute -top-2.5 -right-2"
            />
            <h1 className="text-center">{t('emailHasBeenSent')}</h1>
            <img src={envelope} className="h-14" />
            <p className="text-center">{t('pleaseVerifyEmail')}</p>
          </div>
          <p className="text-xs py-4 text-primary-1100">
            {t('emptyMailbox')} ?{' '}
            <span
              className="text-accent-700 cursor-pointer"
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
