import { LogOut } from 'lucide-react';
import useLogout from '../../hooks/useLogout';
import { useTranslation } from 'react-i18next';

function Logout() {
  const { t } = useTranslation('system');
  const { logout } = useLogout();
  return (
    <button
      className="flex items-center justify-center py-3.5
        hover:bg-primary-210 duration-300 rounded-lg px-1.5 
          cursor-pointer w-full"
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
