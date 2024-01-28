/*eslint-disable*/
import { useFindOrCreateOneToOneConversation } from '../../../hooks/useConversations';
/*eslint-enable*/
import { UserPlus2Icon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../../../components/image';
import { Friend } from '@skillcoop/types';

type NewConversationOneToOneProps = {
  friends: Friend[];
  userId: number | undefined;
  searchInputValue?: string;
  setTypeConversation: React.Dispatch<
    React.SetStateAction<'group' | 'oneToOne'>
  >;
};

function NewConversationOneToOne({
  friends,
  userId,
  setTypeConversation,
  searchInputValue,
}: NewConversationOneToOneProps) {
  const navigate = useNavigate();
  const { mutate: findOrCreateConversation } =
    useFindOrCreateOneToOneConversation({
      onSuccess: (response) => {
        if (response.conversation_id) {
          navigate(`/chat/conversation/${response.conversation_id}`);
        }
      },
    });
  const navigateToConversation = (friendId: number) => {
    findOrCreateConversation({
      user_id_one: Number(userId),
      user_id_two: friendId,
    });
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-end pb-2 pt-4 
        text-sm font-medium text-primary-1000 text-opacity-70"
      >
        <UserPlus2Icon />
        <button
          type="button"
          className="px-4"
          onClick={() => setTypeConversation('group')}
        >
          New group discussion
        </button>
      </div>
      <div className="flex flex-col py-6">
        {friends &&
          friends
            .filter((friend) => {
              if (!searchInputValue) return true;
              return friend.username.includes(searchInputValue);
            })
            .map((friend) => (
              <button
                className="flex cursor-pointer items-center gap-x-4 
              border-b border-b-grey-regular border-opacity-10 px-4  
              py-2 shadow-sm first:border-t first:border-t-grey-regular 
              first:border-opacity-10"
                onClick={() => navigateToConversation(friend.friend_id)}
                aria-roledescription="Link to conversation"
                key={friend.friend_id}
              >
                <ImageWithFallback
                  url={friend.avatar_url}
                  alt={`${friend.username} friend profile avatar`}
                  className="border-primary-dark rounded-full border"
                  size={40}
                />
                <p className="text-xs font-medium">{friend.username}</p>
              </button>
            ))}
      </div>
    </>
  );
}

export default NewConversationOneToOne;
