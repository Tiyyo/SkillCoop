import { Trash2 } from 'lucide-react';
import MenuItemDialog from '../../component/menu-item-dialog';
import { useDeleteUser } from '../../hooks/useProfile';
import { useApp } from '../../store/app.store';
import { useTranslation } from 'react-i18next';

function DeleteUserAccount() {
  const { t } = useTranslation('system');
  const { userId, setIsAuth } = useApp();
  const { mutate: deleteUserAccount } = useDeleteUser({
    onSuccess: () => {
      setIsAuth(false);
    },
  });
  return (
    <MenuItemDialog
      mutateFn={deleteUserAccount}
      description="This action cannot be undone. 
        This will permanently delete your account."
      mutationData={userId}
    >
      <div
        className="flex items-center justify-center py-3.5
          rounded-lg px-1.5 text-error w-full cursor-pointer hover:bg-error-mid 
          hover:bg-opacity-10 duration-300"
      >
        <span className="px-2.5">
          <Trash2 size={18} />
        </span>
        {t('deleteYourAccount')}
      </div>
    </MenuItemDialog>
  );
}

export default DeleteUserAccount;
