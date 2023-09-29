import HeaderEventList from './HeaderEventList';
import { EventType } from '../../types';
import EventCard from './EventCard';
import { useEffect, useRef } from 'react';
import LoadingPage from '../../component/loading-page';
import Spinner from '../../component/loading';

interface EventListProps {
  title: string;
  events: EventType[] | null;
  nbEventToDisplay?: number;
  linkTo?: string;
  linkOff?: boolean;
  infiniteScrollOn?: boolean;
  loading?: boolean;
  triggerNextPage?: () => void;
}

function EventList({
  title,
  events,
  nbEventToDisplay,
  linkTo,
  linkOff,
  infiniteScrollOn,
  triggerNextPage,
  loading,
}: EventListProps) {
  const nbEvent: number | undefined = nbEventToDisplay
    ? nbEventToDisplay
    : undefined;

  const bottomDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting === true) {
        triggerNextPage && triggerNextPage();
      }
    });
    if (bottomDivRef.current && infiniteScrollOn) {
      observer.observe(bottomDivRef.current);
    }
    return () => {
      if (bottomDivRef.current) observer.unobserve(bottomDivRef.current);
    };
  }, []);

  return (
    <>
      <HeaderEventList
        title={title}
        linkTo={linkTo}
        linkOff={linkOff}
      />
      <div className="flex flex-col">
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
        <div ref={bottomDivRef}></div>
        {loading && (
          <div className="py-5">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}

export default EventList;
