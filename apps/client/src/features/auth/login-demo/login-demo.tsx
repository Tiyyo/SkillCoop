import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { loginAsDemo } from '../../../api/auth.fn';

function LoginDemoMode() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { mutate: loginUser } = useMutation({
    mutationFn: async () => loginAsDemo(),
    onSuccess: () => {
      navigate('/', { replace: true });
    },
  });

  return (
    <button
      type="button"
      onClick={() => loginUser()}
      className="my-4 w-[90%] max-w-lg animate-fade-up rounded-lg 
      bg-home-page-gradient px-6 py-4 text-center text-sm opacity-0 
      shadow-lg hover:cursor-pointer"
    >
      {t('loginDemoAccount')}
    </button>
  );
}

export default LoginDemoMode;
