// Event page team composition
import Team from '../../components/team-composition/index.team';
import TitleH2 from '../../components/title-h2';
import Container from '../../layouts/container';
import type { EventParticipant, EventStatus } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

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
      <div className="bg-grey-off lg:flex lg:gap-x-6">
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