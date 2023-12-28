import { getStartingTime, getEndingTime, getDate } from 'date-handler/src';
import type { EventStatus } from 'skillcoop-types';
import { eventStatus as eventStatusAssertion } from 'skillcoop-types';

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
      ? 'Final score'
      : 'Kick off';
  };
  return (
    <div
      className="flex flex-grow flex-col justify-center items-center
     basis-8/12 text-xxs lg:text-xs"
    >
      <p className="px-1 bg-base w-fit rounded-2xl font-medium text-xs py-1.5">
        {displayLegendScore()}
      </p>
      {eventStatus !== 'open' && (
        <p className="text-lg font-semibold py-4 lg:py-1.5">
          {displayScore(eventStatus, scoreTeamA)}
          <span className="text-md mx-2">
            {eventStatus === eventStatusAssertion.completed ? '-' : 'VS'}
          </span>
          {displayScore(eventStatus, scoreTeamB)}
        </p>
      )}
      <p className="flex py-0.5 gap-x-1 justify-center items-center text-xxs lg:text-xs">
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
        className="flex w-full gap-x-1.5 justify-center items-center
         font-normal text-grey-sub-text"
      >
        <p className="basis-1/2 flex justify-end items-center gap-x-1 text-xxs">
          <img src="/images/timer.png" alt="clock icon" />
          <span>{getStartingTime(date)}</span>
          <span className="hidden sm:block">
            {getEndingTime(date, duration)}
          </span>
        </p>
        <span className="mx-0.5 py-1">|</span>
        <p className="basis-1/2">{getDate(date)}</p>
      </div>
    </div>
  );
}

export default Score;
