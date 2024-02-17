import HeaderEventList from './header';
import type { EventType } from '@skillcoop/types/src';
import EventCard from './card';
import InfiniteScroll from '../../shared/components/infinite-scroll';
import { useCallback } from 'react';
import ShowcaseEventCard from './showcase-card';
import { useTranslation } from 'react-i18next';
import NotFoundMessage from '../../shared/components/not-found-message';
import Container from '../../shared/layouts/container';

type EventListProps = {
  title: string;
  events: EventType[] | null;
  nbEventToDisplay?: number;
  linkTo?: string;
  linkOff?: boolean;
  infiniteScrollOn?: boolean;
  loading?: boolean;
  triggerNextPage?: () => void;
  hasMore?: boolean;
  legendHeader?: string;
  noHeader?: boolean;
  showcaseNext?: boolean;
};

function EventList({
  title,
  events,
  nbEventToDisplay,
  linkTo,
  linkOff,
  triggerNextPage,
  loading,
  hasMore,
  legendHeader,
  noHeader,
  showcaseNext,
}: EventListProps) {
  const { t } = useTranslation('system');
  const nbEvent: number | undefined = nbEventToDisplay
    ? nbEventToDisplay
    : undefined;
  const isEventsEmpty = events && events.length === 0;

  const getNextEvent = useCallback(
    (events: any): EventType | null => {
      if (!showcaseNext) return null;
      if (!events || events.length === 0 || Object.keys(events).length === 0)
        return null;
      const [showcaseEvent] = events
        .filter((event: EventType) => event.status_name === 'full')
        .sort(
          (a: EventType, b: EventType) =>
            Number(new Date(a.date)) - Number(new Date(b.date)),
        )
        .slice(0, 1);
      return showcaseEvent as EventType;
    },
    [events],
  );
  const eventsToShowcase = getNextEvent(events);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {eventsToShowcase && (
        <ShowcaseEventCard
          eventId={eventsToShowcase.event_id}
          date={eventsToShowcase.date}
          location={eventsToShowcase.location}
          duration={eventsToShowcase.duration}
          // in case backend didn't parse the participants
          participants={
            typeof eventsToShowcase.participants === 'string'
              ? JSON.parse(eventsToShowcase.participants)
              : eventsToShowcase.participants
          }
          requiredParticipants={eventsToShowcase.required_participants}
          confirmedParticipants={eventsToShowcase.confirmed_participants}
          scoreTeamA={eventsToShowcase.score_team_1}
          scoreTeamB={eventsToShowcase.score_team_2}
          userStatus={eventsToShowcase.user_status}
          eventStatus={eventsToShowcase.status_name}
        />
      )}
      {!noHeader && (
        <HeaderEventList
          title={title}
          linkTo={linkTo}
          legendHeader={legendHeader}
          linkOff={isEventsEmpty ? true : linkOff}
        />
      )}
      {isEventsEmpty && (
        <Container className="w-full flex-grow lg:mt-4">
          <NotFoundMessage message={t('noEventsFound')} />
        </Container>
      )}
      <InfiniteScroll
        loading={loading ?? false}
        triggerNextPage={triggerNextPage}
        hasMore={hasMore ?? false}
      >
        {events &&
          events.length > 0 &&
          events.slice(0, nbEvent).map((event) => (
            <EventCard
              key={event.event_id}
              eventId={event.event_id}
              date={event.date}
              location={event.location}
              duration={event.duration}
              // in case backend didn't parse the participants
              participants={
                typeof event.participants === 'string'
                  ? JSON.parse(event.participants)
                  : event.participants
              }
              requiredParticipants={event.required_participants}
              confirmedParticipants={event.confirmed_participants}
              scoreTeamA={event.score_team_1}
              scoreTeamB={event.score_team_2}
              userStatus={event.user_status}
              eventStatus={event.status_name}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default EventList;
