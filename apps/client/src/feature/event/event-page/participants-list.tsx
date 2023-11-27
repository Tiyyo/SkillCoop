import Participant from '../../../component/participant';
import TitleH2 from '../../../component/title-h2';
import Container from '../../../layout/container';
import { useEvent } from '../../../store/event.store';
import { EventParticipant } from '../../../types';

interface ParticipantsListProps {
  confirmedParticipants: number;
  requiredparticipants: number;
  participants: EventParticipant[] | string;
}

function ParticipantsList({
  confirmedParticipants,
  requiredparticipants,
  participants,
}: ParticipantsListProps) {
  const eventParticipantsStatus = () => {
    return `${confirmedParticipants} / ${requiredparticipants} are confirmed`;
  };
  const { data: eventStore } = useEvent();

  return (
    <Container className="w-full">
      <TitleH2 title="Participants" legend={eventParticipantsStatus()} />
      <ul className="flex flex-wrap  gap-2">
        {/* particpants can be a string if backend failed to parsed data */}
        {typeof participants !== 'string' &&
          participants.map((participant) => (
            <Participant
              isAdmin={eventStore?.organizer_id === participant.profile_id}
              profileId={participant.profile_id}
              eventStatus={eventStore.status_name}
              key={participant.profile_id}
              {...participant}
            />
          ))}
      </ul>
    </Container>
  );
}

export default ParticipantsList;
