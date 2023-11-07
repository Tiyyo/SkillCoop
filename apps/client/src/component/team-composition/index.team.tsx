import { EventParticipant } from '../../types';
import Participant from '../participant';

interface TeamProps {
  participants: EventParticipant[] | string;
  currentIdActive?: string;
  title?: string;
  teamTofileter?: number;
  nameInput?: string;
  mvp?: number | null;
  bestStriker?: number | null;
  organizer?: number;
  eventStatus?: 'full' | 'open' | 'completed' | 'cancelled';
}

function Team({
  participants,
  currentIdActive,
  title,
  teamTofileter,
  nameInput,
  mvp,
  bestStriker,
  organizer,
  eventStatus = 'open',
}: TeamProps) {
  return (
    <>
      {' '}
      <h3 className="text-xs ml-4 py-6">{title}</h3>
      {/* <ul className="flex justify-center gap-2 flex-wrap whitespace-nowrap"> */}
      <ul className="grid gap-2 grid-cols-particpant-layout justify-center">
        {/* particpants can be a string if backend failed to parsed data */}
        {typeof participants !== 'string' &&
          participants
            .filter((participant) => participant.team === teamTofileter)
            .map((participant) => (
              <Participant
                eventStatus={eventStatus}
                key={participant.profile_id}
                name={nameInput}
                activeId={currentIdActive}
                profileId={participant.profile_id}
                isAdmin={participant.profile_id === organizer}
                isMvp={participant.profile_id === mvp}
                isBestStriker={participant.profile_id === bestStriker}
                {...participant}
              />
            ))}
      </ul>
    </>
  );
}

export default Team;