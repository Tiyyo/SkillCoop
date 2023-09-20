interface Particpants {
  profile_id: number;
  username: string;
  avatar?: string;
  status: string;
  team?: number;
}

interface EventCardProps {
  date: string;
  location: string;
  duration: number;
  participants: Particpants[];
  requiredParticipants: number;
  confirmedParticipants: number;
  scoreTeamA?: number | null;
  scoreTeamB?: number | null;
  eventStatus: string;
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
  const formateDate = (date: string) => {
    const eventDate = new Date(date);
    const formatedDate = eventDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "Europe/Paris",
    });
    return formatedDate;
  };

  const displayCorrectStatus = (userStatus: string, eventStatus: string) => {
    return userStatus === "pending" ? "invited" : eventStatus;
  };

  const getStartingTime = (date: string) => {
    const eventDate = new Date(date);
    const formatedDate = eventDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "Europe/Paris",
    });
    return formatedDate;
  };

  const getEndingTime = (date: string, duration: number) => {
    const eventDate = new Date(date);
    // convert duration to milliseconds
    const endingDate = new Date(eventDate.getTime() + duration * 60 * 1000);
    const formatedDate = endingDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "Europe/Paris",
    });
    return formatedDate;
  };

  const displayScore = (eventStatus: string, score?: number | null) => {
    if (eventStatus === "completed" && score) {
      return score;
    }
    return "";
  };

  return (
    <div className=" h-32 border-t bg-base-light shadow-sm px-3 py-2">
      <div className="flex justify-between">
        <div className="flex text-xs">
          <p>{formateDate(date)}</p>
          <span className="px-1">-</span>
          <p>{location}</p>
        </div>
        <div className="uppercase text-xxs font-semibold border border-primary-600 py-0.5 px-1.5 bg-primary-300 rounded-lg">
          {displayCorrectStatus(userStatus, eventStatus)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative flex">
          {eventStatus !== "completed" ||
            ("full" &&
              participants
                .filter((participant) => participant.team === 1)
                .slice(0, 3)
                .map((participant, index) => (
                  <div
                    className="relative rounded-full border-2 border-primary-1100 aspect-square h-8 overflow-hidden"
                    style={{
                      zIndex: 100 - index * 10,
                      transform: `translateX(-${index}rem)`,
                    }}
                  >
                    <img src={participant.avatar ? participant.avatar : "/images/default-avatar.png"} />
                  </div>
                )))}
        </div>
        <div className="text-xxs text-center">
          <p>Kick off</p>
          <div>
            <p className="text-lg font-semibold">
              {displayScore(eventStatus, scoreTeamA)}
              <span className="text-sm mx-2">-</span>
              {displayScore(eventStatus, scoreTeamB)}
            </p>
          </div>
          <p className="flex gap-x-1.5 justify-center">
            <span>{getStartingTime(date)}</span>
            <span>{getEndingTime(date, duration)}</span>
          </p>
        </div>
        <div className="flex-row-reverse flex">
          {eventStatus !== "completed" ||
            ("full" &&
              participants
                .filter((participant) => participant.team === 2)
                .slice(0, 3)
                .map((participant, index) => (
                  <div
                    className="relative rounded-full border-2 border-primary-1100 aspect-square h-8 overflow-hidden"
                    style={{
                      zIndex: 100 - index * 10,
                      transform: `translateX(${index}rem)`,
                    }}
                  >
                    <img src={participant.avatar ? participant.avatar : "/images/default-avatar.png"} />
                  </div>
                )))}
        </div>
      </div>
      {eventStatus !== "completed" && (
        <div className="flex text-xxs items-end ">
          <div className="relative flex">
            {participants.slice(1, 4).map((participant, index) => (
              <div
                className="relative rounded-full border-2 border-primary-1100 aspect-square h-8 overflow-hidden"
                style={{
                  zIndex: 100 - index * 10,
                  transform: `translateX(-${index}rem)`,
                }}
              >
                <img src={participant.avatar ? participant.avatar : "/images/default-avatar.png"} />
              </div>
            ))}
          </div>
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
