import { EventType, Friend } from '../../types';
import FriendCard from '../friend-card';
import FriendCardSkeleton from '../friend-card/skeleton';

interface FriendCardProps {
  data: Friend[] | undefined;
  addFriendToState?: (friendId: number) => void;
  removeFriendsToState?: (friendId: number) => void;
  loading: boolean;
  dataFromState?: EventType | undefined | null;
}

function FriendCards({
  data,
  addFriendToState,
  removeFriendsToState,
  dataFromState,
  loading,
}: FriendCardProps) {
  const NB_SKELTON = 14;
  const skeletons = Array(NB_SKELTON).fill(0);
  return (
    <div className="grid grid-cols-2 py-8 gap-2 my-2 h-[55vh]">
      {!data && <p>No friends found</p>}
      {loading &&
        skeletons.map((_, index) => <FriendCardSkeleton key={index} />)}
      {data?.map((friend) => (
        <FriendCard
          key={friend.friend_id}
          avatar={friend.avatar_url}
          username={friend.username}
          adderId={friend.adder_id}
          friendId={friend.friend_id}
          status={friend.status_name}
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
