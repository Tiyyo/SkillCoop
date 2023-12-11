import { useCreateEvent } from '../../store/create-event.store';
import { useEvent } from '../../store/event.store';
import { Friend } from '../../types/index';
import FriendCards from './index.friends';

type SwitchMutateOrUpdateProps = {
  variant: 'mutate' | 'update';
  data: Friend[] | undefined | null;
  loading: boolean;
};

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
      <div className="overflow-y-scroll self-center w-full no-scrollbar">
        <FriendCards
          data={data}
          //@ts-ignore
          dataFromState={event}
          addFriendToState={addToEvent}
          removeFriendsToState={removeFromEvent}
          loading={loading}
        />
      </div>
    );
  }
  if (variant === 'update') {
    return (
      <div className="overflow-scroll">
        <FriendCards
          data={data}
          //@ts-ignore
          dataFromState={createdEvent}
          addFriendToState={addToCreateEvent}
          removeFriendsToState={removeFromCreateEvent}
          loading={loading}
        />
      </div>
    );
  }
}
export default SwitchMutateOrUpdate;
