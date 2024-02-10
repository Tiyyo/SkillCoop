import { useMemo, useState } from 'react';
import { useNewConversationGroup } from '../../../stores/new-group.store';
import { useCreateGroupConversation } from './useConversations';
import { FriendStoreChat } from '@skillcoop/types';
/*eslint-disable*/
import useGetConversationPath from '../../../shared/hooks/useGetConversationPath';
import { useNavigate } from 'react-router-dom';
/*eslint-enable*/

type NewConversationGroupProps = {
  userId: number | null;
};

export default function useNewGroupConversation({
  userId,
}: NewConversationGroupProps) {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const conversationPath = useGetConversationPath();
  const {
    friends: friendsToAdd,
    removeFriends,
    cleanFriends,
  } = useNewConversationGroup();
  const { mutate: createConversation } = useCreateGroupConversation({
    onSuccess: (response) => {
      if (response.conversationId) {
        cleanFriends();
        navigate(`${conversationPath}${response.conversationId}`);
      }
    },
  });
  const handleChangeTitile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  const participants_ids = useMemo(() => {
    if (!userId) return [];
    return friendsToAdd.reduce(
      (acc: number[], friend: FriendStoreChat) => {
        acc.push(friend.userId);
        return acc;
      },
      [userId],
    );
  }, [friendsToAdd, userId]);

  const handleClickCreateConversation = () => {
    if (!userId) return;
    createConversation({
      creator_id: userId,
      participants_ids,
      title,
    });
  };

  return {
    friendsToAdd,
    removeFriends,
    handleChangeTitile,
    handleClickCreateConversation,
  };
}
