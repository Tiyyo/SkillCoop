/*eslint-disable*/
import useGetConversationPath from '../../../shared/hooks/useGetConversationPath';
import { useFindOrCreateOneToOneConversation } from './useConversations';
/*eslint-enable*/
import { useNavigate } from 'react-router-dom';

type NewConversationOneToOneProps = {
  userId: string | undefined;
  userUsername?: string;
  userAvatar?: string | null;
};

export default function useNewOneToOneConversation({
  userId,
  userUsername,
  userAvatar,
}: NewConversationOneToOneProps) {
  const navigate = useNavigate();
  const conversationPath = useGetConversationPath();
  const { mutate: findOrCreateConversation } =
    useFindOrCreateOneToOneConversation({
      onSuccess: (response) => {
        console.log(response);
        if (response.conversation_id) {
          navigate(`${conversationPath}${response.conversation_id}`);
        }
      },
    });

  const navigateToConversation = (
    friendId: string | undefined,
    friendUsername: string,
    friendAvatar: string | null,
  ) => {
    findOrCreateConversation({
      user_id_one: userId!,
      user_username_one: userUsername!,
      user_avatar_one: userAvatar ?? null,
      user_id_two: friendId!,
      user_username_two: friendUsername,
      user_avatar_two: friendAvatar,
    });
  };

  return { navigateToConversation };
}
