import React, { useState } from 'react';
import { saveScoreSchema } from 'schema/ts-schema';
import Button from '../../../component/button';
import { useApp } from '../../../store/app.store';
import { EventStatus } from '../../../types';
import {
  useUpdateScoreEvent,
  useUpdateSingleEvent,
} from '../../../hooks/useSingleEvent';
import toast from '../../../utils/toast';

interface EventPageScoreProps {
  eventId: number;
  isAdmin: boolean;
  scoreTeam1: number | null;
  scoreTeam2: number | null;
  eventDate: string;
  eventStatus: EventStatus;
}

function EventPageScore({
  eventId,
  isAdmin,
  scoreTeam1,
  scoreTeam2,
  eventDate,
  eventStatus,
}: EventPageScoreProps) {
  const [whichEventStatus, setWhichEventStatus] =
    useState<EventStatus>(eventStatus);
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;

  const { mutate: saveScore, isLoading } = useUpdateScoreEvent({
    eventId: eventId,
  });

  const { mutate: updateStatusEvent } = useUpdateSingleEvent({
    eventId: eventId,
    onSuccess: () => {
      updateStatusEvent({
        event_id: eventId,
        status_name: 'completed',
        profile_id: userProfile?.profile_id,
      });
      setWhichEventStatus('completed');
    },
  });

  const handleSubmitScore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      score_team_1: Number(e.currentTarget.score_team_1.value),
      score_team_2: Number(e.currentTarget.score_team_2.value),
      event_id: eventId,
    };
    const isValid = saveScoreSchema.safeParse(data);
    if (!isValid.success || !profileId) return;
    if (new Date(eventDate) > new Date()) {
      toast.error(
        'You cannot save a score for an event that has not happened yet',
      );
      return;
    }
    saveScore(data);
  };

  if (whichEventStatus === 'cancelled') return null;
  if (whichEventStatus === 'open') return null;
  return (
    <form
      className={`bg-base-light mx-2 rounded-md 
      shadow py-4 px-3 flex flex-col items-center justify-between w-full`}
      onSubmit={handleSubmitScore}
    >
      <p className="text-xs lg:text-lg mb-4">Final Score</p>
      <div>
        <label htmlFor="score_team_1" className="px-3 text-xs">
          Team A
        </label>
        <input
          type="text"
          inputMode="numeric"
          name="score_team_1"
          className={`bg-primary-200 h-14 lg:h-20 w-10 lg:w-14 rounded-md shadow-inner 
          border border-gray-950 border-opacity-40 text-primary-1100 
          font-semibold text-center text-2xl lg:text-3xl`}
          disabled={!isAdmin || whichEventStatus !== 'full'}
          defaultValue={scoreTeam1 ?? ''}
        />
        <span className="font-semibold mx-2">-</span>
        <input
          type="text"
          inputMode="numeric"
          name="score_team_2"
          className={`bg-primary-200 h-14 w-10 lg:h-20 lg:w-14 rounded-md shadow-inner 
          border border-gray-950 border-opacity-40 text-primary-1100 
          font-semibold text-center text-2xl lg:text-3xl`}
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
