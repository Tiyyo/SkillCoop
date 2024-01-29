import { useMutation } from '@tanstack/react-query';
import { logoutUserFn } from '../api/auth.fn';
import { useApp } from '../stores/app.store';
import { queryClient } from '../main';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();
  const { signout } = useApp();

  const { mutate: logoutFromServer } = useMutation({
    mutationFn: async () => {
      return logoutUserFn();
    },
    onSuccess: () => {
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      queryClient.removeQueries({ queryKey: ['auth-user'], exact: true });
      navigate('/login');
    },
  });

  const logout = () => {
    signout();
    logoutFromServer();
  };
  return { logout };
}

export default useLogout;
