import { ArrowRight, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNewConversationGroup } from '../../../stores/new-group.store';
import { useCreateGroupConversation } from '../../../hooks/useConversations';
import { useNavigate } from 'react-router-dom';
import { Friend, FriendStoreChat } from '@skillcoop/types';
import InputCheckbox from './input-checkbox';
/*eslint-disable*/
import ImageWithUsernamefallback from '../../../components/image-fallback-username';
/*eslint-enable*/

type NewConversationGroupProps = {
  friends: Friend[];
  userId: number | null;
};

function NewConversationGroup({ friends, userId }: NewConversationGroupProps) {
  const navigate = useNavigate();
  const {
    friends: friendsToAdd,
    removeFriends,
    cleanFriends,
  } = useNewConversationGroup();
  const [title, setTitle] = useState('');
  const { mutate: createConversation } = useCreateGroupConversation({
    onSuccess: (response) => {
      if (response.conversationId) {
        cleanFriends();
        navigate(`/chat/conversation/${response.conversationId}`);
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

  return (
    <>
      <div
        className="no-scrollbar flex w-full gap-x-4 overflow-x-auto 
         px-6 py-3"
      >
        {friendsToAdd &&
          friendsToAdd.length > 0 &&
          friendsToAdd.map((friend) => (
            <div className="flex-shrink-0 animate-circle-fade-in opacity-0">
              <p className="text-center text-xxs">{friend.username}</p>
              <div className="relative h-10 w-10">
                <ImageWithUsernamefallback
                  avatar={friend.avatar}
                  username={friend.username}
                />
                <button>
                  <X
                    className="absolute -bottom-1 -right-1 cursor-pointer 
                    rounded-full bg-grey-constrast bg-opacity-80 p-0.5 
                  text-dark"
                    size={16}
                    onClick={() => removeFriends(friend.userId)}
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col pb-20 pt-6">
        <input
          type="text"
          placeholder="facultative group name"
          name="title"
          className="mx-auto w-2/3 max-w-lg rounded-xl px-3 py-1.5 
        text-sm placeholder:px-3 placeholder:text-xs"
          onChange={handleChangeTitile}
        />
        {friends &&
          friends.map((friend, index: number) => (
            <InputCheckbox friend={friend} key={index} />
          ))}
        <div
          className="fixed bottom-4 right-4 z-10 flex h-10
        w-10 cursor-pointer items-center justify-center rounded-full 
      bg-primary-900 text-white"
          onClick={handleClickCreateConversation}
        >
          <ArrowRight size={24} />
        </div>
      </div>
    </>
  );
}

export default NewConversationGroup;
