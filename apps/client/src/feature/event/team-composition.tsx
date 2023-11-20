// Event page team composition

import Team from '../../component/team-composition/index.team';
import { EventParticipant, EventStatus } from '../../types';

interface TeamCompositionProps {
  participants: EventParticipant[] | string;
  eventStatus?: EventStatus;
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
    <div className="bg-base-light mx-2 rounded-md shadow py-4 px-3 w-full">
      <h2 className="text-sm font-semibold flex items-center py-1.5">
        Team composition
      </h2>
      <Team
        title="Team A"
        participants={participants}
        teamTofileter={1}
        mvp={mvp}
        bestStriker={bestStriker}
        organizer={organizer}
        eventStatus={eventStatus}
      />
      <Team
        title="Team B"
        participants={participants}
        teamTofileter={2}
        mvp={mvp}
        bestStriker={bestStriker}
        organizer={organizer}
        eventStatus={eventStatus}
      />
    </div>
  );
}

export default TeamComposition;
