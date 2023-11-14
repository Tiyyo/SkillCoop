import { Trash2 } from 'lucide-react';
import Container from '../../../layout/container';
import { useApp } from '../../../store/app.store';
import { useMutation } from '@tanstack/react-query';
import { deleteUserFn } from '../../../api/api.fn';
import MenuItemDialog from '../../../component/menu-item-dialog';
import { queryClient } from '../../../main';

function DeleteUser() {
  const { userProfile, setIsAuth } = useApp();
  //@ts-ignore
  const { mutate: deleteUserAccount } = useMutation((user_id: number) => {
    if (!user_id) return;
    queryClient.clear();
    queryClient.setQueryData(['authUser'], null);
    setIsAuth(false);
    deleteUserFn(user_id);
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
