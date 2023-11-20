import { Link } from 'react-router-dom';
import Avatars from '../../../component/avatars';
import Badge from '../../../component/badge';
import DateAndLocation from '../../../component/date-location';
import Score from '../../../component/score';
import { EventParticipant, EventStatus } from '../../../types';

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
  eventId: number;
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
  eventId,
}: EventCardProps) {
  const displayCorrectStatus = (userStatus: string, eventStatus: string) => {
    return userStatus === 'pending' ? 'invited' : eventStatus;
  };

  const shouldDisplayAvatars = (eventStatus: EventStatus): boolean => {
    if (eventStatus === 'completed') return true;
    if (eventStatus === 'full') return true;
    return false;
  };

  return (
    <div
      className=" h-fit border-t bg-base-light shadow-sm lg:shadow-lg 
          px-3 py-3 max-w-6xl w-full lg:rounded-3xl lg:my-4 lg:px-9 lg:h-56"
    >
      <div className="flex justify-between pb-6 pt-2">
        <DateAndLocation date={date} location={location} />
        <Badge content={displayCorrectStatus(userStatus, eventStatus)} />
      </div>
      <div className="flex items-center justify-center">
        {shouldDisplayAvatars(eventStatus) && (
          <Avatars participants={participants} nbAvatarToDisplay={3} team={1} />
        )}
        <Score
          eventStatus={eventStatus}
          scoreTeamA={scoreTeamA}
          scoreTeamB={scoreTeamB}
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
      <div className="flex items-end justify-between h-max h-[25%]">
        <div>
          {!shouldDisplayAvatars(eventStatus) && (
            <div className="flex text-xxs items-end ">
              <Avatars participants={participants} nbAvatarToDisplay={3} />
              <p className="relative translate-x-1">
                <span className="font-bold">{confirmedParticipants}</span> /{' '}
                <span>{requiredParticipants}</span> are going
              </p>
            </div>
          )}
        </div>
        <Link
          to={`/event/${eventId}`}
          state={{ eventId }}
          className="text-xxs text-light lg:text-xs hover:text-primary-700 
              duration-300 transition-colors"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
