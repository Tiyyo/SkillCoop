import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { sendEmailVerifyFn } from '../../../api/api.fn';
import toast from '../../../utils/toast';
import { emailSchema } from '@skillcoop/schema/src';
import { useTranslation } from 'react-i18next';

export default function useVerifyEmail() {
  const { t } = useTranslation('auth');
  const location = useLocation();
  const email = location.state?.email;
  const { mutate: sendEmailVerify } = useMutation({
    mutationFn: async (email: string) => {
      return sendEmailVerifyFn(email);
    },
    onSuccess: () => {
      toast.emailSent(t('toast:emailSent'));
    },
  });

  const handleClick = () => {
    const isValidEmail = emailSchema.safeParse(email);
    if (!isValidEmail.success) {
      sendEmailVerify(email);
    }
  };

  return { handleClick };
}
