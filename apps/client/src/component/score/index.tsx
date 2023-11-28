import dateHandler from '../../utils/date.handler';
import { eventStatus as eventStatusType } from '../../types';

interface ScoreProps {
  date: string;
  duration: number;
  location: string;
  scoreTeamA?: number | null;
  scoreTeamB?: number | null;
  eventStatus: string;
}

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
    return eventStatus === eventStatusType.completed
      ? 'Final score'
      : 'Kick off';
  };
  return (
    <div
      className="flex flex-grow flex-col justify-center items-center
     basis-8/12 text-xxs lg:text-xs"
    >
      <p className="px-1 py-0.5 bg-base w-fit rounded-2xl">
        {displayLegendScore()}
      </p>
      <p className="text-lg font-semibold lg:py-1.5">
        {displayScore(eventStatus, scoreTeamA)}
        <span className="text-md mx-2">
          {eventStatus === eventStatusType.completed ? '-' : 'VS'}
        </span>
        {displayScore(eventStatus, scoreTeamB)}
      </p>
      <p className="flex py-0.5 gap-x-1 items-center text-xxs lg:text-xs">
        <img src="/images/location.png" alt="location icon" />
        <span>{location}</span>
      </p>
      <p className="flex gap-x-1.5 justify-center items-center font-semibold text-grey-sub-text">
        <img src="/images/timer.png" alt="clock icon" />
        <span>{dateHandler.getStartingTime(date)}</span>
        <span>{dateHandler.getEndingTime(date, duration)}</span>
        <span className="mx-0.5 py-1">|</span>
        <span>{dateHandler.getFormatedDate(date)}</span>
      </p>
    </div>
  );
}

export default Score;
