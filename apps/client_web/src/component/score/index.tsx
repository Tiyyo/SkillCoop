import dateHandler from "../../utils/date.handler";

interface ScoreProps {
  date: string;
  duration: number;
  scoreTeamA: number | null;
  scoreTeamB: number | null;
  eventStatus: string;
}

function Score({
  date,
  duration,
  scoreTeamA,
  scoreTeamB,
  eventStatus,
}: ScoreProps) {
  const displayScore = (eventStatus: string, score?: number | null) => {
    if (eventStatus === "completed" && score) {
      return score;
    }
    return "";
  };
  return (
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
        <span>{dateHandler.getStartingTime(date)}</span>
        <span>{dateHandler.getEndingTime(date, duration)}</span>
      </p>
    </div>
  );
}

export default Score;
