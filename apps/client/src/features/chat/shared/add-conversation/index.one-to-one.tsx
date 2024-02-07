/*eslint-disable*/
import { useFindOrCreateOneToOneConversation } from '../../../../hooks/useConversations';
/*eslint-enable*/
import { UserPlus2Icon } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageWithFallback from '../../../../components/image';
import { Friend } from '@skillcoop/types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('chat');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDesktopChat = pathname.split('/').includes('desktop');
  const conversationLink = isDesktopChat
    ? '/desktop/chat/conversation/'
    : '/chat/conversation/';
  const { mutate: findOrCreateConversation } =
    useFindOrCreateOneToOneConversation({
      onSuccess: (response) => {
        if (response.conversation_id) {
          navigate(`${conversationLink}${response.conversation_id}`);
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
          {t('newGroupDiscussion')}
        </button>
      </div>
      <div
        className="no-scrollbar flex h-50vh flex-col content-start 
        overflow-y-auto px-2 py-6 lg:gap-3 xl:grid xl:grid-cols-2 
        2xl:grid-cols-3"
      >
        {friends &&
          friends
            .filter((friend) => {
              if (!searchInputValue) return true;
              return friend.username.includes(searchInputValue);
            })
            .map((friend) => (
              <button
                className="flex h-16 cursor-pointer items-center 
              gap-x-4 border-b border-b-grey-regular border-opacity-10  
              px-4 py-2 shadow-sm first:border-t 
              first:border-t-grey-regular first:border-opacity-10 
              lg:rounded-xl lg:border-none lg:bg-base"
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
