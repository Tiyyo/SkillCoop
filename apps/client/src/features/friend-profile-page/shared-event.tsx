import Container from '../../layouts/container';
import TitleH2 from '../../components/title-h2';
import { useTranslation } from 'react-i18next';
import SharedEventCard from '../event/resume-events/shared-event-card';

type SharedEventsProps = {
  username: string;
  friendId: number;
  currentUserId: number | null;
  events: any;
};

function SharedEvents({ username, events }: SharedEventsProps) {
  const { t } = useTranslation('title');
  console.log('events', events);
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
    </Container>
  );
}

export default SharedEvents;
