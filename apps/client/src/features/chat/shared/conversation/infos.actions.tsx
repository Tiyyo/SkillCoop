import { DialogClose } from '@radix-ui/react-dialog';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
} from '../../../../lib/ui/dialog';
import { ConversationParticipant, TypeConversation } from '@skillcoop/types';
import { LogOut, Trash } from 'lucide-react';
import { useRef } from 'react';
import {
  useDeleteConversation,
  useRemoveFromConversationGroup,
} from '../../../../hooks/useConversations';
import { useNavigate } from 'react-router-dom';

type ConversationInfosActionsProps = {
  conversationId: number;
  currentUserId: number | null;
  participantsList: ConversationParticipant[];
  typeConversation: TypeConversation;
};

function ConversationInfosActions({
  conversationId,
  currentUserId,
  typeConversation,
  participantsList,
}: ConversationInfosActionsProps) {
  const modalDeleteGroupRef = useRef<HTMLButtonElement>(null);
  const modalLeaveGroupRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { mutate: deleteGroupConversation } = useDeleteConversation({
    conversationId,
    onSuccess: () => {
      handleCloseDeleteModal();
      navigate('/chat');
    },
  });
  const { mutate: removeFromConversation } = useRemoveFromConversationGroup({
    conversationId,
    onSuccess: () => {
      handleCloseLeaveModal();
      navigate('/chat');
    },
  });
  const isAdmin = !!participantsList.find(
    (p) => p.is_admin === 1 && p.user_id === currentUserId,
  );

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
    <div
      className="flex w-full flex-col items-center justify-center 
      gap-y-3 pt-16"
    >
      {typeConversation !== 'oneToOne' && (
        <Dialog>
          <DialogTrigger>
            <p
              className="flex w-full max-w-sm cursor-pointer items-center 
          justify-center gap-x-3 rounded-xl bg-gray-300
          bg-opacity-5 py-2 text-xs font-medium 
          text-dark duration-200 hover:bg-gray-300 
          hover:bg-opacity-10 hover:shadow-sm"
            >
              <LogOut size={16} />
              Leave Group
            </p>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-base-light">
            <DialogClose ref={modalLeaveGroupRef}></DialogClose>
            <p className="mx-auto w-4/5 text-center text-sm">
              Vous êtes sur le point de quitter cette discussion et cette action
              est définitive.<br></br>
              Est vous sûr de vouloir continuer ?
            </p>
            <div className="flex items-center justify-center gap-x-4">
              <button className="text-sm" onClick={handleClickLeaveGroup}>
                Continue
              </button>
              <button
                className="rounded-md bg-primary-800 px-3 py-1.5 text-sm"
                onClick={() => handleCloseLeaveModal()}
              >
                Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {isAdmin && typeConversation === 'group' && (
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
              Delete Group
            </p>
          </DialogTrigger>
          <DialogContent className=" max-w-md bg-base-light">
            <DialogClose ref={modalDeleteGroupRef}></DialogClose>
            <p className="mx-auto w-4/5 text-center text-sm">
              Vous êtes sur le point de supprimer cette discussion et cette
              action est définitive.<br></br>
              Est vous sûr de vouloir continuer ?
            </p>
            <div className="flex items-center justify-center gap-x-4">
              <button className="text-sm" onClick={handleClickDeleteGroup}>
                Continue
              </button>
              <button
                className="rounded-md bg-primary-800 px-3 py-1.5 text-sm"
                onClick={() => handleCloseDeleteModal()}
              >
                Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ConversationInfosActions;
