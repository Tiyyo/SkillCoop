import dateHandler from '../../utils/date.handler';
import { eventStatus as eventStatusType } from '../../types';

interface ScoreProps {
  date: string;
  duration: number;
  scoreTeamA?: number | null;
  scoreTeamB?: number | null;
  eventStatus: string;
}

function Score({
  date,
  duration,
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
  return (
    <div className="text-xxs text-center">
      <p>
        {eventStatus === eventStatusType.completed ? 'Final score' : 'Kick off'}
      </p>
      <div>
        <p className="text-lg font-semibold">
          {displayScore(eventStatus, scoreTeamA)}
          <span className="text-sm mx-2">-</span>
          {displayScore(eventStatus, scoreTeamB)}
        </p>
      </div>
      <p className="flex gap-x-1.5 justify-center">
        <span>{dateHandler.getStartingTime(date)}</span>
        <span>{dateHandler.getEndingTime(date, duration)}</span>
      </p>
    </div>
  );
}

export default Score;
