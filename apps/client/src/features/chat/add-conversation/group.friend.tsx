import { Friend } from '@skillcoop/types/src';
import { Checkbox } from '../../../lib/ui/checkbox';
import { useEffect, useRef } from 'react';
import { useNewConversationGroup } from '../store/new-group.store';
import ImageWithFallback from '../../../shared/components/image';

type InputCheckboxProps = {
  friend: Friend;
};

function InputCheckbox({ friend }: InputCheckboxProps) {
  const inputCheckboxRef = useRef<HTMLInputElement>(null);
  const {
    addFriends,
    removeFriends,
    friends: friendsToAdd,
  } = useNewConversationGroup();
  const isChecked = !!friendsToAdd.find((f) => f.userId === friend.friend_id);

  const handleChecked = () => {
    const isChecked = inputCheckboxRef.current
      ? !inputCheckboxRef.current.checked
      : false;
    if (inputCheckboxRef.current) {
      inputCheckboxRef.current.checked = isChecked;
    }

    if (isChecked && !friendsToAdd.find((f) => f.userId === friend.friend_id)) {
      addFriends({
        userId: friend.friend_id,
        username: friend.username,
        avatar: friend.avatar_url,
      });
    } else {
      removeFriends(friend.friend_id);
    }
  };
  //TODO: could use useSyncExternalStore
  useEffect(() => {
    if (!inputCheckboxRef.current) return;
    if (friendsToAdd.find((f) => f.userId === friend.friend_id)) {
      inputCheckboxRef.current.checked = true;
    } else {
      inputCheckboxRef.current.checked = false;
    }
  }, [friendsToAdd]);

  return (
    <label
      className="flex cursor-pointer items-center justify-between 
                 gap-x-4 border-b border-b-grey-regular border-opacity-10  
                 px-4 py-2 shadow-sm first:border-t first:border-t-grey-regular
               first:border-opacity-10 lg:rounded-xl lg:border-none lg:bg-base"
      aria-roledescription="Link to conversation"
      key={friend.friend_id}
      htmlFor="id"
    >
      <ImageWithFallback
        url={friend.avatar_url}
        alt={`${friend.username} friend profile avatar`}
        className="border-primary-dark rounded-full border"
        size={40}
      />
      <p className="flex-grow text-start text-xs font-medium">
        {friend.username}
      </p>
      <div className="relative" onClick={handleChecked}>
        <input
          type="checkbox"
          value={friend.friend_id}
          name="id"
          ref={inputCheckboxRef}
          className="absolute left-0 top-0 -z-10 h-6"
        />
        <Checkbox checked={isChecked} />
      </div>
    </label>
  );
}

export default InputCheckbox;
