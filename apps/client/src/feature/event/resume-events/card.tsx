import { Link } from 'react-router-dom';
import Avatars from '../../../component/avatars';
import Badge from '../../../component/badge';
import Score from '../../../component/score';
import { EventParticipant, EventStatus } from '../../../types';
import { ArrowRight } from 'lucide-react';

type EventCardProps = {
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
};

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
      className="flex flex-col bg-base-light shadow lg:rounded-3xl w-full 
      px-6 pb-6 pt-2 h-fit lg:my-2 border-t border-primary-200 lg:border-none"
    >
      <div className="flex justify-end py-2">
        <Badge content={displayCorrectStatus(userStatus, eventStatus)} />{' '}
      </div>
      <div className="flex">
        {shouldDisplayAvatars(eventStatus) && (
          <div className="flex gap-x-3 items-center basis-2/12">
            <img
              src="/images/jersey.png"
              alt="jersey icon"
              className=" h-8 md:h-10 lg:h-18"
            />
            <div className="flex-shrink-0">
              <div className="hidden md:block lg:font-semibold">Team</div>
              <Avatars
                participants={participants}
                team={1}
                nbAvatarToDisplay={3}
                plus={requiredParticipants / 2 - 3}
                startSide="left"
              />
            </div>
          </div>
        )}
        <Score
          eventStatus={eventStatus}
          scoreTeamA={scoreTeamA}
          scoreTeamB={scoreTeamB}
          date={date}
          duration={duration}
          location={location}
        />
        {shouldDisplayAvatars(eventStatus) && (
          <div className="flex flex-row-reverse gap-x-3 items-center basis-2/12">
            <img
              src="/images/jersey.png"
              alt="jersey icon"
              className=" h-8 md:h-10 lg:h-18"
            />
            <div className="flex-shrink-0">
              <div className="hidden md:block lg:font-semibold">Team</div>
              <Avatars
                participants={participants}
                team={2}
                nbAvatarToDisplay={3}
                plus={requiredParticipants / 2 - 3}
                startSide="right"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between py-2">
        <div>
          {!shouldDisplayAvatars(eventStatus) && (
            <div className="flex text-xxs items-end ">
              <Avatars
                participants={participants}
                nbAvatarToDisplay={3}
                plus={confirmedParticipants - 3}
              />
              <p className="font-light lg:text-xs relative translate-x-1">
                <span className="font-semibold">{confirmedParticipants}</span> /{' '}
                <span>{requiredParticipants}</span> are going
              </p>
            </div>
          )}
        </div>
        <Link
          to={`/event/${eventId}`}
          state={{ eventId }}
          className="flex items-end flex-row-reverse flex-grow text-xxs text-dark 
            lg:text-sm hover:text-primary-100 duration-300 transition-colors"
        >
          <span className="flex items-center gap-x-0.5">
            Details
            <ArrowRight size={14} className="selt-center" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
