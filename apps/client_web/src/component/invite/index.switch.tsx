import { useCreateEvent } from '../../store/create-event.store';
import { useEvent } from '../../store/event.store';
import { Friend } from '../../types';
import FriendCards from './index.friends';

interface SwitchMutateOrUpdateProps {
  variant: 'mutate' | 'update';
  data: Friend[] | undefined;
  loading: boolean;
}

function SwitchMutateOrUpdate({
  variant,
  data,
  loading,
}: SwitchMutateOrUpdateProps) {
  const {
    addInvitedParticipantsIds: addToEvent,
    removeInvitedParticipantsIds: removeFromEvent,
    data: event,
  } = useEvent();
  const {
    addInvitedParticipantsIds: addToCreateEvent,
    removeInvitedParticipantsIds: removeFromCreateEvent,
    data: createdEvent,
  } = useCreateEvent();

  if (variant === 'mutate') {
    return (
      <FriendCards
        data={data}
        dataFromState={event}
        addFriendToState={addToEvent}
        removeFriendsToState={removeFromEvent}
        loading={loading}
      />
    );
  }
  if (variant === 'update') {
    return (
      <FriendCards
        data={data}
        dataFromState={createdEvent}
        addFriendToState={addToCreateEvent}
        removeFriendsToState={removeFromCreateEvent}
        loading={loading}
      />
    );
  }
}
export default SwitchMutateOrUpdate;
