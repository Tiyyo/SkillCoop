/*eslint-disable*/
import useGetConversationPath from '../../../shared/hooks/useGetConversationPath';
import { useFindOrCreateOneToOneConversation } from './useConversations';
/*eslint-enable*/
import { useNavigate } from 'react-router-dom';

type NewConversationOneToOneProps = {
  userId: number | undefined;
};

export default function useNewOneToOneConversation({
  userId,
}: NewConversationOneToOneProps) {
  const navigate = useNavigate();
  const conversationPath = useGetConversationPath();
  const { mutate: findOrCreateConversation } =
    useFindOrCreateOneToOneConversation({
      onSuccess: (response) => {
        if (response.conversation_id) {
          navigate(`${conversationPath}${response.conversation_id}`);
        }
      },
    });

  const navigateToConversation = (friendId: number) => {
    findOrCreateConversation({
      user_id_one: Number(userId),
      user_id_two: friendId,
    });
  };

  return { navigateToConversation };
}
