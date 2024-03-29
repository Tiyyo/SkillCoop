import Container from '../../shared/layouts/container';
import TitleH2 from '../../shared/components/title-h2';
import { useTranslation } from 'react-i18next';
import SharedEventCard from '../../shared/components/shared-event-card';

type SharedEventsProps = {
  username: string;
  events: any;
};

function SharedEvents({ username, events }: SharedEventsProps) {
  const { t } = useTranslation('title');

  return (
    <Container className="lg:w-1/2 lg:rounded-l-none">
      <TitleH2
        title={t('sharedEvents')}
        legend={t('sharedEventsLegend', { username })}
      />
      {events &&
        events.length > 0 &&
        events
          .slice(0, 2)
          .map((event: any) => (
            <SharedEventCard
              key={event.event_id}
              eventId={event.event_id}
              date={event.date}
              location={event.location}
              duration={event.duration}
              scoreTeamA={event.score_team_1}
              scoreTeamB={event.score_team_2}
              participants={event.participants}
            />
          ))}
      {(!events || events?.length === 0) && (
        <p className="py-20 text-center text-xs italic text-light">
          {t('event:noSharedEvents', { username })}
        </p>
      )}
    </Container>
  );
}

export default SharedEvents;
