import {
  getStartingTime,
  getEndingTime,
  getDate,
} from '@skillcoop/date-handler/src';
import type { EventStatus } from '@skillcoop/types';
import { eventStatus as eventStatusAssertion } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';
import { getCurrentLngInLocalStorage } from '../../utils/get-current-lng';

type ScoreProps = {
  date: string;
  duration: number;
  location: string;
  scoreTeamA?: number | null;
  scoreTeamB?: number | null;
  eventStatus: EventStatus;
};

function Score({
  date,
  duration,
  location,
  scoreTeamA,
  scoreTeamB,
  eventStatus,
}: ScoreProps) {
  const { t } = useTranslation('event');
  // TODO: Maybe localStorage is too expensive performance wise
  const currentLng = getCurrentLngInLocalStorage();
  const isScoreValid = (score: number | null | undefined) => {
    return score !== null && score !== undefined;
  };

  const displayScore = (eventStatus: string, score?: number | null) => {
    if (eventStatus === 'completed' && isScoreValid(score)) {
      return score;
    }
    return '';
  };

  const isToday =
    new Date().toLocaleDateString() === new Date(date).toLocaleDateString();

  const displayLegendScore = () => {
    if (isToday) {
      return 'Today';
    }
    return eventStatus === eventStatusAssertion.completed
      ? t('finalScore')
      : t('kickoff');
  };
  return (
    <div
      className="flex flex-grow basis-8/12 flex-col items-center
     justify-center text-xxs lg:text-xs"
    >
      <p className="w-fit rounded-2xl bg-base px-1 py-1.5 text-xs font-medium">
        {displayLegendScore()}
      </p>
      {eventStatus !== 'open' && (
        <p className="py-4 text-lg font-semibold lg:py-1.5">
          {displayScore(eventStatus, scoreTeamA)}
          <span className="mx-2 text-md">
            {eventStatus === eventStatusAssertion.completed ? '-' : 'VS'}
          </span>
          {displayScore(eventStatus, scoreTeamB)}
        </p>
      )}
      <p
        className="flex items-center justify-center gap-x-1 
        py-0.5 text-xxs lg:text-xs"
      >
        <span className="relative">
          <img
            src="/images/location.png"
            alt="location icon"
            className="absolute -left-6 -top-1"
          />
          {location}
        </span>
      </p>
      <div
        className="flex w-full items-center justify-center gap-x-1.5
         font-normal text-grey-sub-text"
      >
        <p className="flex basis-1/2 items-center justify-end gap-x-1 text-xxs">
          <img src="/images/timer.png" alt="clock icon" />
          <span>{getStartingTime(date)}</span>
          <span className="hidden sm:block">
            {getEndingTime(date, duration)}
          </span>
        </p>
        <span className="mx-0.5 py-1">|</span>
        <p className="basis-1/2">{getDate(date, currentLng)}</p>
      </div>
    </div>
  );
}

export default Score;
