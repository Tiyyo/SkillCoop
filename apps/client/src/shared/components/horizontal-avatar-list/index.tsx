/*eslint-disable*/
import { X } from 'lucide-react';
import ImageWithUsernamefallback from '../../../components/image-fallback-username';
/*eslint-enable*/

type HorizontalAvatarListProps = {
  friends: {
    avatar: string | null;
    username: string;
    userId: number;
  }[];
  remove?: (userId: number) => void;
};

function HorizontalAvatarList({ friends, remove }: HorizontalAvatarListProps) {
  const handleClick = (userId: number) => {
    if (remove) {
      remove(userId);
    }
  };

  return (
    <>
      {' '}
      {friends &&
        friends.length > 0 &&
        friends.map((friend) => (
          <div className="flex-shrink-0 animate-circle-fade-in opacity-0">
            <p className="text-center text-xxs">{friend.username}</p>
            <div className="relative h-10 w-10">
              <ImageWithUsernamefallback
                avatar={friend.avatar}
                username={friend.username}
              />
              {remove && (
                <button>
                  <X
                    className="absolute -bottom-1 -right-1 cursor-pointer 
                    rounded-full bg-base bg-opacity-80 p-0.5 
                  text-text-base"
                    size={16}
                    onClick={() => handleClick(friend.userId)}
                  />
                </button>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

export default HorizontalAvatarList;
