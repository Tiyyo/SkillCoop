import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@skillcoop/schema/src';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordFn } from '../../../api/api.fn';
import { useState } from 'react';
import { ResetPassword } from '@skillcoop/types/src';
import usePasswordMeter from '../../../hooks/usePasswordMeter';

export default function useResetPassword() {
  const [hasBeenReset, setHasBeenReset] = useState(false);
  const [linkHasExpire, setLinkHasExpire] = useState(false);
  const { currentPassword, trackPasswordChangeValue } = usePasswordMeter();
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: async (data: ResetPassword) => {
      return resetPasswordFn(data);
    },
    onSuccess: (response) => {
      if (response.message !== 'expire') {
        return setHasBeenReset(true);
      }
      setLinkHasExpire(true);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPassword) => {
    resetPassword(data);
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isLoading,
    linkHasExpire,
    hasBeenReset,
    currentPassword,
    trackPasswordChangeValue,
  };
}
