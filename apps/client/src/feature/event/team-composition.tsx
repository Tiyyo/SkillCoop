// Event page team composition

import Team from '../../component/team-composition/index.team';
import TitleH2 from '../../component/title-h2';
import Container from '../../layout/container';
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
    <Container className="w-full p-0 shadow-none">
      <Container className="shadow-none">
        <TitleH2 title="Team Composition" legend="Balanced generated teams" />
      </Container>
      <div className="lg:flex lg:gap-x-6 bg-grey-off">
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
    </Container>
  );
}

export default TeamComposition;
