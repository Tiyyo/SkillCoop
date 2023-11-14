import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { saveScoreFn, updateEventFn } from '../../../api/api.fn';
import { saveScoreSchema } from 'schema/ts-schema';
import Button from '../../../component/button';
import { useApp } from '../../../store/app.store';

interface EventPageScoreProps {
  eventId: number;
  isAdmin: boolean;
  scoreTeam1: number | null;
  scoreTeam2: number | null;
  eventStatus: 'full' | 'open' | 'completed' | 'cancelled';
}

function EventPageScore({
  eventId,
  isAdmin,
  scoreTeam1,
  scoreTeam2,
  eventStatus,
}: EventPageScoreProps) {
  const [whichEventStatus, setWhichEventStatus] = useState<
    'full' | 'open' | 'completed' | 'cancelled'
  >(eventStatus);
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { mutate: saveScore, isLoading } = useMutation(
    (data: { event_id: number; score_team_1: number; score_team_2: number }) =>
      saveScoreFn(data),
  );
  const { mutate: updateStatusEvent } = useMutation(
    (data: Record<string, string | number>) => updateEventFn(data),
  );

  const handleSubmitScore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      score_team_1: Number(e.currentTarget.score_team_1.value),
      score_team_2: Number(e.currentTarget.score_team_2.value),
      event_id: eventId,
    };
    //@ts-ignore
    const isValid = saveScoreSchema.safeParse(data);
    if (!isValid.success || !profileId) return;
    saveScore(data);
    updateStatusEvent({
      event_id: eventId,
      status_name: 'completed',
      profile_id: userProfile.profile_id,
    });
    setWhichEventStatus('completed');
  };
  if (whichEventStatus === 'cancelled') return null;
  if (whichEventStatus === 'open') return null;
  return (
    <form
      className={`bg-base-light mx-2 my-4 rounded-md 
      shadow py-4 px-3 flex flex-col items-center justify-between`}
      onSubmit={handleSubmitScore}
    >
      <p className="text-xs mb-4">Final Score</p>
      <div>
        <label htmlFor="score_team_1" className="px-3 text-xs">
          Team A
        </label>
        <input
          type="text"
          inputMode="numeric"
          name="score_team_1"
          className={`bg-primary-200 h-14 w-10 rounded-md shadow-inner 
          border border-gray-950 border-opacity-40 text-primary-1100 
          font-semibold text-center text-2xl`}
          disabled={!isAdmin || whichEventStatus !== 'full'}
          defaultValue={scoreTeam1 ?? ''}
        />
        <span className="font-semibold mx-2">-</span>
        <input
          type="text"
          inputMode="numeric"
          name="score_team_2"
          className={`bg-primary-200 h-14 w-10 rounded-md shadow-inner 
          border border-gray-950 border-opacity-40 text-primary-1100 
          font-semibold text-center text-2xl`}
          disabled={!isAdmin || whichEventStatus !== 'full'}
          defaultValue={scoreTeam2 ?? ''}
        />
        <label htmlFor="score_team_2" className="px-3 text-xs">
          Team B
        </label>
      </div>
      {whichEventStatus === 'full' && isAdmin && (
        <Button
          type="submit"
          className="py-1 mt-8 w-20"
          isLoading={isLoading}
          textContent="SAVE"
        />
      )}
    </form>
  );
}

export default EventPageScore;
