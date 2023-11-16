import { Trash2 } from 'lucide-react';
import Container from '../../../layout/container';
import { useApp } from '../../../store/app.store';
import MenuItemDialog from '../../../component/menu-item-dialog';
import { useDeleteUser } from '../../../hooks/useProfile';

function DeleteUser() {
  const { userProfile, setIsAuth } = useApp();
  const { mutate: deleteUserAccount } = useDeleteUser({
    onSuccess: () => {
      setIsAuth(false);
    },
  });

  return (
    <Container className="text-error flex gap-4 justify-center cursor-pointer">
      <MenuItemDialog
        mutateFn={deleteUserAccount}
        description="This action cannot be undone. This will permanently delete your
            account."
        mutationData={userProfile?.user_id}
        redirection="/"
      >
        <Trash2 />
        <span>Delete your acccount</span>
      </MenuItemDialog>
    </Container>
  );
}

export default DeleteUser;
