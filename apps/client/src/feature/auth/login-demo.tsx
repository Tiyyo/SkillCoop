import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { loginAsDemo } from '../../api/auth.fn';

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
      className="w-[90%] max-w-lg text-center bg-home-page-gradient
          shadow-lg px-6 py-4 rounded-lg my-4 text-sm animate-fade-up opacity-0 
          hover:cursor-pointer"
    >
      Cliquez ici pour vous connecter avec un compte vous permettant d'avoir un
      aperçu du fonctionnement de l'application.
    </button>
  );
}

export default LoginDemoMode;
