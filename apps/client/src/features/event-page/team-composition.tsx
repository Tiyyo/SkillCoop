// Event page team composition
import Team from '../../shared/components/team-composition/index.team';
import TitleH2 from '../../shared/components/title-h2';
import Container from '../../shared/layouts/container';
import type { EventParticipant, EventStatus } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

type TeamCompositionProps = {
  participants?: EventParticipant[] | null;
  eventStatus?: EventStatus | null;
  mvp?: string | null;
  bestStriker?: string | null;
  organizer?: string | null;
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
    <Container
      className="w-full overflow-hidden  
      p-0 shadow-none lg:rounded-lg"
    >
      <Container className="overflow-hidden shadow-none lg:rounded-lg">
        <TitleH2
          title={t('teamComposition')}
          legend={t('balancedGeneratedTeams')}
        />
      </Container>
      <div className="flex h-7 justify-between bg-base-light">
        <div className="w-[25%] rounded-r-xl bg-grey-off"></div>
        <div className="w-[30%] rounded-xl bg-grey-off"></div>
        <div className="w-[25%] rounded-l-xl bg-grey-off"></div>
      </div>
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
