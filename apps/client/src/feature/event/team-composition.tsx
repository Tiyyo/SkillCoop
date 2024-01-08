// Event page team composition
import Team from '../../component/team-composition/index.team';
import TitleH2 from '../../component/title-h2';
import Container from '../../layout/container';
<<<<<<< HEAD
import type { EventParticipant, EventStatus } from '@skillcoop/types';
=======
import type { EventParticipant, EventStatus } from 'skillcoop-types';
import { useTranslation } from 'react-i18next';
>>>>>>> aa5cf6df31348fffebf5a3aa2a2bdf2e309550e8

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
  const { t } = useTranslation('event');
  // this is a different team comp and need to be refactored with the new one

  return (
    <Container className="w-full p-0 shadow-none">
      <Container className="shadow-none">
        <TitleH2
          title={t('teamComposition')}
          legend={t('balancedGeneratedTeams')}
        />
      </Container>
      <div className="lg:flex lg:gap-x-6 bg-grey-off">
        <Team
          title={t('team') + ' A'}
          participants={participants}
          teamTofileter={1}
          mvp={mvp}
          bestStriker={bestStriker}
          organizer={organizer ?? undefined}
          eventStatus={eventStatus}
        />
        <Team
          title={t('team') + ' B'}
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
