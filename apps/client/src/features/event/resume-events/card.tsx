import { Link } from 'react-router-dom';
import Avatars from '../../../components/avatars';
import Badge from '../../../components/badge';
import Score from '../../../components/score';
import type { EventParticipant, EventStatus } from '@skillcoop/types/src';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('event');
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
      className="flex h-fit w-full flex-col border-t border-primary-200 
      bg-base-light px-6 pb-6 pt-2 shadow lg:my-2 lg:rounded-3xl lg:border-none"
    >
      <div className="flex justify-end py-2">
        <Badge content={displayCorrectStatus(userStatus, eventStatus)} />{' '}
      </div>
      <div className="flex">
        {shouldDisplayAvatars(eventStatus) && (
          <div className="flex basis-2/12 items-center gap-x-3">
            <img
              src="/images/generic_jersey_blue.png"
              alt="jersey icon"
              className="aspect-auto h-2/6 lg:mx-3"
            />
            <div className="flex-shrink-0">
              <div className="hidden md:block lg:font-semibold">
                {t('team')}
              </div>
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
          <div
            className="flex basis-2/12 flex-row-reverse 
            items-center gap-x-3"
          >
            <img
              src="/images/generic_jersey_blue.png"
              alt="jersey icon"
              className="aspect-auto h-2/6 lg:mx-3"
            />
            <div className="flex-shrink-0">
              <div className="hidden md:block lg:font-semibold">
                {t('team')}
              </div>
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
            <div className="flex items-end text-xxs ">
              <Avatars
                participants={participants}
                nbAvatarToDisplay={3}
                plus={confirmedParticipants - 3}
              />
              <p className="relative translate-x-1 font-light lg:text-xs">
                <span className="font-semibold">{confirmedParticipants} </span>/
                <span> {requiredParticipants}</span> {t('areGoing')}
              </p>
            </div>
          )}
        </div>
        <Link
          to={`/event/${eventId}`}
          state={{ eventId }}
          className="flex flex-grow flex-row-reverse items-end 
          text-xxs text-text-base transition-colors duration-300 
          hover:text-primary-100 lg:text-sm"
        >
          <span className="flex items-center gap-x-0.5">
            {t('details')}
            <ArrowRight size={14} className="selt-center" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
