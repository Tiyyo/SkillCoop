import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { saveScoreFn } from '../../api/authApi';
import schema from 'schema';
import Button from '../../component/button';
const { saveScoreSchema } = schema;

interface EventPageScoreProps {
  eventId: number;
  isAdmin: boolean;
  scoreTeam1: number | null;
  scoreTeam2: number | null;
  eventStatus: string;
}

function EventPageScore({
  eventId,
  isAdmin,
  scoreTeam1,
  scoreTeam2,
  eventStatus,
}: EventPageScoreProps) {
  const { mutate: saveScore } = useMutation(
    (data: { event_id: number; score_team_1: number; score_team_2: number }) =>
      saveScoreFn(data)
  );

  const handleSubmitScore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      score_team_1: Number(e.currentTarget.score_team_1.value),
      score_team_2: Number(e.currentTarget.score_team_2.value),
      event_id: eventId,
    };
    const isValid = saveScoreSchema.safeParse(data);
    if (!isValid.success) return;
    saveScore(data);
  };

  return (
    <form
      className="bg-base-light mx-2 my-4 rounded-md shadow py-4 px-3 flex flex-col items-center justify-between"
      onSubmit={handleSubmitScore}>
      <p className="text-xs mb-4">Final Score</p>
      <div>
        <label
          htmlFor="score_team_1"
          className="px-3 text-xs">
          Team A
        </label>
        <input
          type="number"
          name="score_team_1"
          className="bg-primary-200 h-14 w-10 rounded-md shadow-inner border border-gray-950 border-opacity-40 text-primary-1100 font-semibold text-center text-2xl"
          disabled={!isAdmin}
          defaultValue={scoreTeam1 ?? 'NC'}
        />
        <span className="font-semibold mx-2">-</span>
        <input
          type="number"
          name="score_team_2"
          className="bg-primary-200 h-14 w-10 rounded-md shadow-inner border border-gray-950 border-opacity-40 text-primary-1100 font-semibold text-center text-2xl"
          disabled={!isAdmin}
          defaultValue={scoreTeam2 ?? 'NC'}
        />
        <label
          htmlFor="score_team_2"
          className="px-3 text-xs">
          Team B
        </label>
      </div>
      {eventStatus === 'full' && isAdmin && (
        <Button
          type="submit"
          className="py-1 mt-8 w-20"
          textContent="SAVE"
        />
      )}
    </form>
  );
}

export default EventPageScore;
