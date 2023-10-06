import { EventParticipant } from '../../types';
import Participant from '../participant';

interface TeamProps {
  participants: EventParticipant[] | string;
  currentIdActive?: string;
  title?: string;
  teamTofileter?: number;
  nameInput?: string;
}

function Team({
  participants,
  currentIdActive,
  title,
  teamTofileter,
  nameInput,
}: TeamProps) {
  return (
    <>
      {' '}
      <h3 className="text-xs ml-4 py-6">{title}</h3>
      <ul className="flex justify-center gap-2 flex-wrap">
        {/* particpants can be a string if backend failed to parsed data */}
        {typeof participants !== 'string' &&
          participants
            .filter((participant) => participant.team === teamTofileter)
            .map((participant) => (
              <Participant
                key={participant.profile_id}
                name={nameInput}
                activeId={currentIdActive}
                {...participant}
              />
            ))}
      </ul>
    </>
  );
}

export default Team;
