import { DialogClose } from '@radix-ui/react-dialog';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
} from '../../../../lib/ui/dialog';
import { Trash } from 'lucide-react';
import { useRef } from 'react';
import { useDeleteConversation } from '../../hooks/useConversations';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type InfosActionsDeleteGroupProps = {
  conversationId: number;
  currentUserId: number | null;
};

function InfosActionsDeleteGroup({
  conversationId,
  currentUserId,
}: InfosActionsDeleteGroupProps) {
  const modalDeleteGroupRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation('chat');
  const { mutate: deleteGroupConversation } = useDeleteConversation({
    conversationId,
    onSuccess: () => {
      handleCloseDeleteModal();
      navigate('/chat');
    },
  });
  const handleCloseDeleteModal = () => {
    if (!modalDeleteGroupRef.current) return;
    modalDeleteGroupRef.current.click();
  };

  const handleClickDeleteGroup = () => {
    if (!currentUserId) return;
    deleteGroupConversation({
      conversation_id: conversationId,
      user_id: currentUserId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p
          className="flex w-full max-w-sm cursor-pointer 
          items-center  justify-center gap-x-3  rounded-xl 
          bg-opacity-5 px-8 py-2 text-xs 
          font-medium text-error duration-200 
          hover:bg-error-mid hover:bg-opacity-10 hover:shadow-sm"
        >
          <Trash size={16} />
          {t('deleteGroup')}
        </p>
      </DialogTrigger>
      <DialogContent className=" max-w-md bg-base-light">
        <DialogClose ref={modalDeleteGroupRef}></DialogClose>
        <p className="mx-auto w-4/5 text-center text-sm">
          {t('areYouSureToDeleteGroup')}
          <br></br>
          {t('system:areYouSureToContinue')} ?
        </p>
        <div className="flex items-center justify-center gap-x-4">
          <button className="text-sm" onClick={handleClickDeleteGroup}>
            {t('system:continue')}
          </button>
          <button
            className="rounded-md bg-primary-800 px-3 py-1.5 text-sm"
            onClick={() => handleCloseDeleteModal()}
          >
            {t('system:cancel')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InfosActionsDeleteGroup;
