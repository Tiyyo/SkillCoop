import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyResetPasswordTokenFn } from '../../../api/api.fn';
import ResetPassword from '../../../features/auth/reset-password';

function ResetPasswordMiddleware() {
  const navigate = useNavigate();
  const [userResetTokenIsValid, setUserResetTokenIsValid] = useState(false);
  const { data, isLoading, isSuccess } = useQuery(
    ['reset-password'],
    async () => {
      return verifyResetPasswordTokenFn();
    },
  );
  useEffect(() => {
    if (!isSuccess) return;
    if (data && data.message === 'success') {
      setUserResetTokenIsValid(true);
    }
    if (data && data.message === 'expire') {
      navigate('/login');
    }
  }, [isLoading]);

  return userResetTokenIsValid && <ResetPassword />;
}

export default ResetPasswordMiddleware;
