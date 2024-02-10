import { Trash2 } from 'lucide-react';
import MenuItemDialog from '../../components/menu-item-dialog';
import { useDeleteUser } from '../../shared/hooks/useProfile';
import { useApp } from '../../shared/store/app.store';
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
        className="flex w-full cursor-pointer items-center
          justify-center rounded-lg px-1.5 py-3.5 text-error duration-300 
          hover:bg-error-mid hover:bg-opacity-10"
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
