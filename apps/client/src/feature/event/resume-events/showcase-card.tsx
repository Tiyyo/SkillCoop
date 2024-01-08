import Avatars from '../../../component/avatars';
import type { EventParticipant, EventStatus } from '@skillcoop/types/src';
import {
  getDate,
  getEndingTime,
  getStartingTime,
} from '@skillcoop/date-handler/src';
import { useTranslation } from 'react-i18next';

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

function ShowcaseEventCard({
  date,
  location,
  duration,
  participants,
  requiredParticipants,
}: EventCardProps) {
  const { t } = useTranslation('event');
  return (
    <div
      className="bg-stadium bg-cover flex items-center flex-col 
      bg-base-light shadow 
      lg:rounded-3xl w-full px-6 pb-6 pt-2 aspect-4/1 lg:my-2"
    >
      <p className="font-semibold">{t('nextEvent')}</p>
      <p
        className="flex py-0.5 gap-x-1 items-center text-xxs lg:text-xs 
        font-medium text-dark"
      >
        <span>{location}</span>
      </p>
      <div
        className="flex text-xxs md:text-sm gap-x-1.5 
        justify-center items-center 
        font-normal text-dark pb-2 w-full"
      >
        <p className="basis-1/2 flex justify-end gap-x-1">
          <span>{getStartingTime(date)}</span>
          <span>{getEndingTime(date, duration)}</span>
        </p>
        <span className="mx-0.5 py-1">|</span>
        <p className="basis-1/2">
          <span>{getDate(date)}</span>
        </p>
      </div>
      <div className="flex flex-grow justify-between items-center w-full ">
        <div className="flex gap-x-3 items-center basis-2/12">
          <img
            src="/images/jersey.png"
            alt="jersey icon"
            className=" h-8 md:h-10 lg:h-18"
          />
          <div className="flex-shrink-0">
            <div className="hidden md:block lg:font-semibold">{t('team')}</div>
            <Avatars
              participants={participants}
              team={1}
              nbAvatarToDisplay={3}
              plus={requiredParticipants / 2 - 3}
              startSide="left"
            />
          </div>
        </div>
        <p className="font-semibold text-lg">VS</p>
        <div className="flex flex-row-reverse gap-x-3 items-center basis-2/12">
          <img
            src="/images/jersey.png"
            alt="jersey icon"
            className=" h-8 md:h-10 lg:h-18"
          />
          <div className="flex-shrink-0">
            <div className="hidden md:block lg:font-semibold">{t('team')}</div>
            <Avatars
              participants={participants}
              team={2}
              nbAvatarToDisplay={3}
              plus={requiredParticipants / 2 - 3}
              startSide="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseEventCard;
