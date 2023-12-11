import SkeletonsLoader from '../../feature/event/event-page/invitation/skeletons-loader';
import { CreateEventStateStore } from '../../store/create-event.store';
import { EventStateStore, useEvent } from '../../store/event.store';
import { Friend } from '../../types/index';
import FriendCard from '../friend-card';
import FriendCardSkeleton from '../friend-card/skeleton';

type FriendCardProps = {
  profileSearchResult: Friend[] | undefined | null;
  addFriendToState?: (friendId: number) => void;
  removeFriendsToState?: (friendId: number) => void;
  loading: boolean;
  activeFilter?: boolean;
  dataFromState?: CreateEventStateStore | undefined | null;
};

function FriendCards({
  profileSearchResult,
  addFriendToState,
  removeFriendsToState,
  dataFromState,
  activeFilter = false,
  loading,
}: FriendCardProps) {
  // const { data: event } = useEvent();

  if (loading) {
    return <SkeletonsLoader nbSkeleton={10} />;
  }

  if (!profileSearchResult) {
    return (
      <div className="text-center italic text-xs py-12 text-light">
        No friends found
      </div>
    );
  }
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
     py-8 gap-2 my-2 h-[55vh] content-start max-w-7xl mx-auto"
    >
      {profileSearchResult
        // ?.filter((searchProfile) => {
        //   // if there is no need to filter pass this step
        //   // if (!activeFilter) return true;
        //   // if (!event.participants) return true;
        //   // Compare friend of user with participant to display only unrelated friends
        //   // return !event.participants
        //   //   .map((p) => p.profile_id)
        //   //   .includes(searchProfile.friend_id);
        // })
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
