import { useTranslation } from 'react-i18next';
import { Friend } from '@skillcoop/types/src';
/*eslint-disable*/
import ImageWithUsernamefallback from '../../../../components/image-fallback-username';
/*eslint-enable*/

type InfosMembersFriendslistProps = {
  setSearchValue: (value: string) => void;
  filteredFriends: Friend[] | undefined;
  addUsersToGroup: (value: any) => void;
  conversationId: number;
};

function InfosMembersFriendslist({
  setSearchValue,
  filteredFriends,
  addUsersToGroup,
  conversationId,
}: InfosMembersFriendslistProps) {
  const { t } = useTranslation('chat');
  return (
    <div className="h-0 w-full animate-open-vertical overflow-y-hidden">
      <input
        type="text"
        placeholder="Search friends"
        className=" my-2 h-9 w-4/5 border-b bg-transparent text-xs 
          transition-colors duration-100 focus:border-b-2 
          focus:border-b-primary-500 focus:outline-none"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul
        className="no-scrollbar flex h-64 w-full
          flex-col gap-y-2 overflow-y-scroll px-1.5 pb-20 pt-3"
      >
        {filteredFriends &&
          filteredFriends.length > 0 &&
          filteredFriends.map((friend) => (
            <li className="flex items-center justify-between ">
              <div className="flex items-center gap-x-4">
                <div className="relative h-10 w-10">
                  <ImageWithUsernamefallback
                    avatar={friend.avatar_url}
                    username={friend.username}
                  />
                </div>
                <p className="py-0.5 text-center text-xxs">{friend.username}</p>
              </div>
              <button
                className="text-xs font-medium text-primary-1100"
                onClick={() =>
                  addUsersToGroup({
                    participants_ids: [friend.friend_id],
                    conversation_id: conversationId,
                  })
                }
              >
                {t('add')} +
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default InfosMembersFriendslist;
