import { CreateEventStateStore } from '../../store/create-event.store';
import { EventStateStore, useEvent } from '../../store/event.store';
import { EventParticipant, Friend } from '../../types/index';
import FriendCard from '../friend-card';
import FriendCardSkeleton from '../friend-card/skeleton';

type UpdateParticipantStoreEventFn =
  | ((participant: EventParticipant) => void)
  | ((friendId: number) => void);

type FriendCardProps = {
  profileSearchResult: Friend[] | undefined | null;
  addFriendToState?: UpdateParticipantStoreEventFn;
  removeFriendsToState?: UpdateParticipantStoreEventFn;
  loading: boolean;
  activeFilter?: boolean;
  dataFromState?: EventStateStore | CreateEventStateStore | undefined | null;
};

function FriendCards({
  profileSearchResult,
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
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
     py-8 gap-2 my-2 h-[55vh] content-start max-w-7xl mx-auto"
    >
      {!profileSearchResult && (
        <div className="text-center italic text-xs py-4 text-light">
          No friends found
        </div>
      )}
      {loading &&
        skeletons.map((_, index) => <FriendCardSkeleton key={index} />)}
      {!loading &&
        profileSearchResult
          ?.filter((searchProfile) => {
            // if there is no need to filter pass this step
            if (!activeFilter) return true;
            if (!event.participants) return true;
            // Compare friend of user with participant to display only unrelated friends
            return !event.participants
              .map((p) => p.profile_id)
              .includes(searchProfile.friend_id);
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
