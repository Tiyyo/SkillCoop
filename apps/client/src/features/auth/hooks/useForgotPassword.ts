import { useMutation } from '@tanstack/react-query';
import { forgotPasswordFn } from '../../../../src/api/api.fn';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { emailSchema } from '@skillcoop/schema/src';

export default function useForgotPassword() {
  const { t } = useTranslation('auth');
  const [hasBeenSent, setHasBeenSent] = useState(false);
  const [error, setError] = useState('');
  const [countRender, setCountRender] = useState(0);
  const { mutate: sendEmailWithResetLink, isLoading } = useMutation({
    mutationFn: async (email: string) => {
      return forgotPasswordFn(email);
    },
    onSuccess: () => {
      setHasBeenSent(true);
    },
    onError: () => {
      setError(t('toast:thisEmailIsNotAssociated'));
      setCountRender((prev) => prev + 1);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: e.currentTarget.email.value,
    };
    const isValid = emailSchema.safeParse(data);
    if (!isValid.success) {
      setError(t('toast:thisIsNotAValidEmail'));
    } else {
      sendEmailWithResetLink(data.email);
    }
  };
  return { hasBeenSent, error, countRender, isLoading, handleSubmit };
}
