import { useEvent } from '../../store/event.store';
import { EventType, Friend } from '../../types';
import FriendCard from '../friend-card';
import FriendCardSkeleton from '../friend-card/skeleton';

interface FriendCardProps {
  data: Friend[] | undefined;
  addFriendToState?: (friendId: number) => void;
  removeFriendsToState?: (friendId: number) => void;
  loading: boolean;
  activeFilter?: boolean;
  dataFromState?: EventType | undefined | null;
}

function FriendCards({
  data,
  addFriendToState,
  removeFriendsToState,
  dataFromState,
  activeFilter = false,
  loading,
}: FriendCardProps) {
  const { data: event } = useEvent();
  const NB_SKELTON = 10;
  const skeletons = Array(NB_SKELTON).fill(0);
  return (
    <div className="grid grid-cols-2 py-8 gap-2 my-2 h-[55vh] content-start">
      {!data && (
        <div className="text-center italic text-xs py-4 text-light">
          No friends found
        </div>
      )}
      {loading &&
        skeletons.map((_, index) => <FriendCardSkeleton key={index} />)}
      {!loading &&
        data
          ?.filter((friend) => {
            if (!activeFilter) return true;
            if (!event.participants) return true;
            return !event.participants.includes(friend.friend_id);
          })
          .map((friend) => (
            <FriendCard
              key={friend.friend_id}
              avatar={friend.avatar_url}
              username={friend.username}
              adderId={friend.adder_id}
              friendId={friend.friend_id}
              status={friend.status_name}
              //@ts-ignore
              dataFromState={dataFromState}
              addFriendToState={addFriendToState}
              removeFriendFromState={removeFriendsToState}
              activeSelected
            />
          ))}
    </div>
  );
}

export default FriendCards;
