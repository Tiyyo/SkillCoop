import { DialogClose } from '@radix-ui/react-dialog';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
} from '../../../../lib/ui/dialog';
import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRemoveFromConversationGroup } from '../../hooks/useConversations';

type InfosActionsLeaveGroupProps = {
  conversationId: number;
  currentUserId: string | null;
};

function InfosActionsLeaveGroup({
  conversationId,
  currentUserId,
}: InfosActionsLeaveGroupProps) {
  const { t } = useTranslation('chat');
  const navigate = useNavigate();
  const modalLeaveGroupRef = useRef<HTMLButtonElement>(null);

  const { mutate: removeFromConversation } = useRemoveFromConversationGroup({
    conversationId,
    onSuccess: () => {
      handleCloseLeaveModal();
      navigate('/chat');
    },
  });

  const handleCloseLeaveModal = () => {
    if (!modalLeaveGroupRef.current) return;
    modalLeaveGroupRef.current.click();
  };

  const handleClickLeaveGroup = () => {
    if (!currentUserId) return;
    removeFromConversation({
      conversation_id: conversationId,
      participant_id: currentUserId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p
          className="flex w-full max-w-sm cursor-pointer 
          items-center justify-center gap-x-3 rounded-xl
          bg-opacity-5 px-4 py-2 text-xs font-medium
          text-text-base duration-200 hover:bg-gray-300 
          hover:bg-opacity-10 hover:shadow-sm"
        >
          <LogOut size={16} />
          {t('leaveGroup')}
        </p>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-base-light">
        <DialogClose ref={modalLeaveGroupRef}></DialogClose>
        <p className="mx-auto w-4/5 text-center text-sm">
          {t('areYouSureToLeaveGroup')}
          <br></br>
          {t('system:areYouSureToContinue')} ?
        </p>
        <div className="flex items-center justify-center gap-x-4">
          <button className="text-sm" onClick={handleClickLeaveGroup}>
            {t('system:continue')}
          </button>
          <button
            className="rounded-md bg-primary-800 px-3 py-1.5 text-sm"
            onClick={() => handleCloseLeaveModal()}
          >
            {t('system:cancel')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InfosActionsLeaveGroup;
