import Avatars from "../../component/avatars";
import Badge from "../../component/badge";
import DateAndLocation from "../../component/date-location";
import Score from "../../component/score";
import { EventParticipant, EventStatus } from "../../types";

interface EventCardProps {
  date: string;
  location: string;
  duration: number;
  participants: EventParticipant[];
  requiredParticipants: number;
  confirmedParticipants: number;
  scoreTeamA?: number | null;
  scoreTeamB?: number | null;
  eventStatus: EventStatus;
  userStatus: string;
}

function EventCard({
  date,
  location,
  duration,
  requiredParticipants,
  confirmedParticipants,
  scoreTeamA,
  scoreTeamB,
  eventStatus,
  userStatus,
  participants,
}: EventCardProps) {
  const displayCorrectStatus = (userStatus: string, eventStatus: string) => {
    return userStatus === "pending" ? "invited" : eventStatus;
  };

  const shouldDisplayAvatars = (eventStatus: EventStatus): boolean => {
    if (eventStatus === "completed") return true;
    if (eventStatus === "full") return false;
    return false;
  };

  return (
    <div className=" h-32 border-t bg-base-light shadow-sm px-3 py-2">
      <div className="flex justify-between">
        <DateAndLocation date={date} location={location} />
        <Badge content={displayCorrectStatus(userStatus, eventStatus)} />
      </div>
      <div className="flex items-center justify-center">
        {shouldDisplayAvatars(eventStatus) && (
          <Avatars participants={participants} nbAvatarToDisplay={3} team={1} />
        )}
        <Score
          eventStatus={eventStatus}
          scoreTeamA={scoreTeamA ? scoreTeamA : null}
          scoreTeamB={scoreTeamB ? scoreTeamB : null}
          date={date}
          duration={duration}
        />
        {shouldDisplayAvatars(eventStatus) && (
          <Avatars
            participants={participants}
            team={2}
            nbAvatarToDisplay={3}
            startSide="right"
          />
        )}
      </div>
      {eventStatus !== "completed" && (
        <div className="flex text-xxs items-end ">
          <Avatars participants={participants} nbAvatarToDisplay={3} />
          <p className="relative -translate-x-4">
            <span className="font-bold">{confirmedParticipants}</span> /{" "}
            <span>{requiredParticipants}</span> are going
          </p>
        </div>
      )}
    </div>
  );
}

export default EventCard;
