import { LogOut } from 'lucide-react';
import useLogout from '../../hooks/useLogout';
import { useTranslation } from 'react-i18next';

function Logout() {
  const { t } = useTranslation('system');
  const { logout } = useLogout();
  return (
    <button
      className="flex w-full cursor-pointer items-center
        justify-center rounded-lg px-1.5 py-3.5 
          duration-300 hover:bg-primary-210"
      onClick={() => logout()}
    >
      <span className="px-2.5">
        <LogOut size={18} />
      </span>
      {t('logout')}
    </button>
  );
}

export default Logout;
