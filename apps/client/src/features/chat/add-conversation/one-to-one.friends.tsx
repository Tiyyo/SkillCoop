import ImageWithFallback from '../../../components/image';
import { Friend } from '@skillcoop/types';

type AddNewConversationOneToOneFriendsProps = {
  friends: Friend[];
  searchInputValue: string | undefined;
  navigateToConversation: (friendId: number) => void;
};

function AddNewConversationOneToOneFriends({
  friends,
  searchInputValue,
  navigateToConversation,
}: AddNewConversationOneToOneFriendsProps) {
  return (
    <>
      {' '}
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
    </>
  );
}

export default AddNewConversationOneToOneFriends;
