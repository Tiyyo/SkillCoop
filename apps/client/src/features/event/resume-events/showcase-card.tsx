import Avatars from '../../../components/avatars';
import type { EventParticipant, EventStatus } from '@skillcoop/types/src';
import {
  getDate,
  getEndingTime,
  getStartingTime,
} from '@skillcoop/date-handler/src';
import { useTranslation } from 'react-i18next';
import { getCurrentLngInLocalStorage } from '../../../utils/get-current-lng';

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
  const currentLng = getCurrentLngInLocalStorage();
  const { t } = useTranslation('event');
  return (
    <div
      className="flex aspect-4/1 w-full flex-col items-center 
      bg-base-light bg-stadium 
      bg-cover px-6 pb-6 pt-2 shadow lg:my-2 lg:rounded-3xl"
    >
      <p className="font-semibold text-dark">{t('nextEvent')}</p>
      <p
        className="flex items-center gap-x-1 py-0.5 text-xxs font-medium 
        text-dark lg:text-xs"
      >
        <span>{location}</span>
      </p>
      <div
        className="flex w-full items-center justify-center 
        gap-x-1.5 pb-2 
        text-xxs font-normal text-dark md:text-sm"
      >
        <p className="flex basis-1/2 justify-end gap-x-1">
          <span>{getStartingTime(date)}</span>
          <span>{getEndingTime(date, duration)}</span>
        </p>
        <span className="mx-0.5 py-1">|</span>
        <p className="basis-1/2">
          <span>{getDate(date, currentLng)}</span>
        </p>
      </div>
      <div className="flex w-full flex-grow items-center justify-between ">
        <div className="flex h-full basis-2/12 items-center gap-x-3">
          <img
            src="/images/generic_jersey_blue.png"
            alt="jersey icon"
            className="aspect-auto h-3/6 lg:mx-3"
          />
          <div className="flex-shrink-0">
            <div className="hidden md:block lg:font-semibold">{t('team')}</div>
            <Avatars
              participants={participants}
              team={1}
              nbAvatarToDisplay={3}
              plus={requiredParticipants / 2 - 3}
              startSide="left"
              borderNone
            />
          </div>
        </div>
        <p className="text-lg font-semibold">VS</p>
        <div
          className="flex h-full basis-2/12 flex-row-reverse 
          items-center gap-x-3"
        >
          <img
            src="/images/generic_jersey_blue.png"
            alt="jersey icon"
            className="aspect-auto h-3/6 lg:mx-3"
          />
          <div className="flex-shrink-0">
            <div className="hidden md:block lg:font-semibold">{t('team')}</div>
            <Avatars
              participants={participants}
              team={2}
              nbAvatarToDisplay={3}
              plus={requiredParticipants / 2 - 3}
              startSide="right"
              borderNone
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseEventCard;
