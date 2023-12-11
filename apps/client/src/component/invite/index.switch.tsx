import { useCreateEvent } from '../../store/create-event.store';
import { useEvent } from '../../store/event.store';
import { Friend } from '../../types/index';
import FriendCards from './index.friends';

type SwitchMutateOrUpdateProps = {
  variant: 'mutate' | 'update';
  profileSearchResult: Friend[] | undefined | null;
  loading: boolean;
};

function SwitchMutateOrUpdate({
  variant,
  profileSearchResult,
  loading,
}: SwitchMutateOrUpdateProps) {
  const {
    addParticipant: addToEventStore,
    removeParticipant: removeFromEventStore,
    data: eventStore,
  } = useEvent();

  const {
    addInvitedParticipantsIds: addToCreateEventStore,
    removeInvitedParticipantsIds: removeFromCreateEventStore,
    data: createdEventStore,
  } = useCreateEvent();
  // Need to have 2 differents components because of the case where one of 2 store is not initailized
  if (variant === 'mutate') {
    return (
      <div className="overflow-y-scroll self-center w-full no-scrollbar">
        <FriendCards
          profileSearchResult={profileSearchResult}
          dataFromState={eventStore}
          addFriendToState={addToEventStore}
          removeFriendsToState={removeFromEventStore}
          loading={loading}
        />
      </div>
    );
  }
  if (variant === 'update') {
    return (
      <div className="overflow-scroll">
        <FriendCards
          profileSearchResult={profileSearchResult}
          dataFromState={createdEventStore}
          addFriendToState={addToCreateEventStore}
          removeFriendsToState={removeFromCreateEventStore}
          loading={loading}
        />
      </div>
    );
  }
}
export default SwitchMutateOrUpdate;
