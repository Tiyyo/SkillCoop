import Participant from '../../component/participant';
import { EventParticipant } from '../../types';

interface TeamCompositionProps {
  participants: EventParticipant[] | string;
  eventStatus?: 'full' | 'open' | 'completed' | 'cancelled';
  mvp?: number | null;
  bestStriker?: number | null;
  organizer?: number;
}

function TeamComposition({
  participants,
  mvp,
  bestStriker,
  organizer,
  eventStatus = 'full',
}: TeamCompositionProps) {
  // this is a different team comp and need to be refactored with the new one

  return (
    <div className="bg-base-light mx-2 my-4 rounded-md shadow py-4 px-3">
      <h2 className="text-sm font-semibold flex items-center py-1.5">
        Team composition
      </h2>
      <h3 className="text-xs ml-4 py-6">Team A</h3>
      <ul className="flex justify-center gap-2 flex-wrap">
        {/* particpants can be a string if backend failed to parsed data */}
        {typeof participants !== 'string' &&
          participants
            .filter((participant) => participant.team === 1)
            .map((participant) => (
              <Participant
                eventStatus={eventStatus}
                profileId={participant.profile_id}
                isAdmin={participant.profile_id === organizer}
                isMvp={participant.profile_id === mvp}
                isBestStriker={participant.profile_id === bestStriker}
                key={participant.profile_id}
                {...participant}
              />
            ))}
      </ul>
      <h3 className="text-xs ml-4 py-6">Team B</h3>
      <ul className="flex justify-center gap-2 flex-wrap">
        {/* particpants can be a string if backend failed to parsed data */}
        {typeof participants !== 'string' &&
          participants
            .filter((participant) => participant.team === 2)
            .map((participant) => (
              <Participant
                eventStatus={eventStatus}
                profileId={participant.profile_id}
                key={participant.profile_id}
                isAdmin={participant.profile_id === organizer}
                isMvp={participant.profile_id === mvp}
                isBestStriker={participant.profile_id === bestStriker}
                {...participant}
              />
            ))}
      </ul>
    </div>
  );
}

export default TeamComposition;
