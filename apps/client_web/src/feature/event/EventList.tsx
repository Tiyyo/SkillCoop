import HeaderEventList from "./HeaderEventList";
import { EventType } from "../../types";
import EventCard from "./EventCard";

interface EventListProps {
  title: string;
  events: EventType[] | null;
  nbEventToDisplay?: number;
}

function EventList({ title, events, nbEventToDisplay }: EventListProps) {
  const nbEvent: number | undefined = nbEventToDisplay
    ? nbEventToDisplay
    : undefined;

  return (
    <>
      <HeaderEventList title={title} />
      <div className="flex flex-col">
        {events &&
          events?.slice(0, nbEvent).map((event) => (
            <>
              <EventCard
                date={event.date}
                location={event.location}
                duration={event.duration}
                // in case backend didn't parse the participants
                participants={
                  typeof event.participants === "string"
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
            </>
          ))}
      </div>
    </>
  );
}

export default EventList;
