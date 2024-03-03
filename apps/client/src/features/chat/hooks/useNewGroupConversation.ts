import { useMemo, useState } from 'react';
import { useNewConversationGroup } from '../store/new-group.store';
import { useCreateGroupConversation } from './useConversations';
import { FriendStoreChat } from '@skillcoop/types';
/*eslint-disable*/
import useGetConversationPath from '../../../shared/hooks/useGetConversationPath';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../shared/store/app.store';
/*eslint-enable*/

type NewConversationGroupProps = {
  userId: string | undefined;
};

export default function useNewGroupConversation({
  userId,
}: NewConversationGroupProps) {
  const { userProfile } = useApp();
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

  const handleClickCreateConversation = () => {
    if (!userId || !userProfile?.username) return;
    createConversation({
      creator: {
        userId,
        username: userProfile?.username,
        avatar: userProfile?.avatar_url,
      },
      participants: friendsToAdd,
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
