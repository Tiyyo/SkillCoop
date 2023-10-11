import { Trash2 } from 'lucide-react';
import Container from '../../../layout/container';
import { useApp } from '../../../store/app.store';
import { useMutation } from '@tanstack/react-query';
import { deleteUserFn } from '../../../api/api.fn';

function DeleteUser() {
  const { userProfile } = useApp();
  const { mutate } = useMutation((user_id: number) => deleteUserFn(user_id));
  const handleClick = () => {
    if (!userProfile?.user_id) return;
    mutate(userProfile?.user_id);
  };

  return (
    <Container className="text-error flex gap-4 justify-center cursor-pointer">
      <Trash2 />
      <span onClick={handleClick}>Delete your acccount</span>
    </Container>
  );
}

export default DeleteUser;
