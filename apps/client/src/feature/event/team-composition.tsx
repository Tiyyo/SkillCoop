// Event page team composition
import Team from '../../component/team-composition/index.team';
import TitleH2 from '../../component/title-h2';
import Container from '../../layout/container';
import { EventParticipant, EventStatus } from '../../types';

type TeamCompositionProps = {
  participants?: EventParticipant[] | string | null;
  eventStatus?: EventStatus | null;
  mvp?: number | null;
  bestStriker?: number | null;
  organizer?: number | null;
};

function TeamComposition({
  participants,
  mvp,
  bestStriker,
  organizer,
  eventStatus,
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
          organizer={organizer ?? undefined}
          eventStatus={eventStatus}
        />
        <Team
          title="Team B"
          participants={participants}
          teamTofileter={2}
          mvp={mvp}
          bestStriker={bestStriker}
          organizer={organizer ?? undefined}
          eventStatus={eventStatus}
        />
      </div>
    </Container>
  );
}

export default TeamComposition;
