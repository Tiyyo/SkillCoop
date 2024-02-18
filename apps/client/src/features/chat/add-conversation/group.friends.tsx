import InputCheckbox from './group.friend';
import { Friend } from '@skillcoop/types/src';

type AddNewGroupConversationFriendsProps = {
  friends: Friend[];
  searchInputValue: string | undefined;
};

function AddNewGroupConversationFriends({
  friends,
  searchInputValue,
}: AddNewGroupConversationFriendsProps) {
  return (
    <>
      {' '}
      {friends &&
        friends
          .filter((friend) => {
            if (!searchInputValue) return true;
            return friend.username.includes(searchInputValue);
          })
          .map((friend, index: number) => (
            <InputCheckbox friend={friend} key={index} />
          ))}
    </>
  );
}

export default AddNewGroupConversationFriends;
