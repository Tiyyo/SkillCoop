import React from 'react';
import { saveScoreSchema, updateEventSchema } from 'schema/ts-schema';
import Button from '../../../component/button';
import { useApp } from '../../../store/app.store';
import type { EventStatus } from 'skillcoop-types';
import { eventStatus as eventStatusAssertion } from 'skillcoop-types';
import {
  useUpdateScoreEvent,
  useUpdateSingleEvent,
} from '../../../hooks/useSingleEvent';
import toast from '../../../utils/toast';
import Container from '../../../layout/container';
import TitleH2 from '../../../component/title-h2';
import { useEvent } from '../../../store/event.store';
import { useTranslation } from 'react-i18next';

type EventPageScoreProps = {
  eventId: number;
  isAdmin: boolean;
  scoreTeam1: number | null;
  scoreTeam2: number | null;
  eventDate: string;
  eventStatus: EventStatus | null;
};

function EventPageScore({
  eventId,
  isAdmin,
  scoreTeam1,
  scoreTeam2,
  eventDate,
  eventStatus,
}: EventPageScoreProps) {
  const { t } = useTranslation('event');
  const { userProfile } = useApp();
  const { updateStatusName } = useEvent();
  const profileId = userProfile?.profile_id;

  const { mutate: saveScore, isLoading } = useUpdateScoreEvent({
    eventId: eventId,
  });

  const { mutate: updateStatusEvent } = useUpdateSingleEvent({
    eventId: eventId,
    onSuccess: () => {
      updateStatusName(eventStatusAssertion.completed);
    },
  });

  const handleSubmitScore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postScoreData = {
      score_team_1: Number(e.currentTarget.score_team_1.value),
      score_team_2: Number(e.currentTarget.score_team_2.value),
      event_id: eventId,
    };
    const patchEventData = {
      event_id: eventId,
      status_name: eventStatusAssertion.completed,
      profile_id: userProfile?.profile_id,
    };
    const isScoreDataValid = saveScoreSchema.safeParse(postScoreData);
    const isStatusDataValid = updateEventSchema.safeParse(patchEventData);
    if (!isScoreDataValid.success || !isStatusDataValid.success || !profileId)
      return;
    if (new Date(eventDate) > new Date()) {
      toast.error(
        'You cannot save a score for an event that has not happened yet',
      );
      return;
    }
    saveScore(postScoreData);
    updateStatusEvent(patchEventData);
  };

  if (eventStatus === 'cancelled') return null;
  if (eventStatus === 'open') return null;
  return (
    <Container className="flex flex-col min-w-[335px]">
      <TitleH2 title={t('finalScore')} />
      {/* "bg-base-light mx-2 rounded-md py-4 px-3 flex flex-col items-center
      justify-between w-full" */}
      <form
        className={`bg-base-light mx-2 rounded-md 
       py-4 px-3 flex flex-col items-center justify-between w-full`}
        onSubmit={handleSubmitScore}
      >
        <div>
          <label htmlFor="score_team_1" className="px-3 text-xs">
            {t('team')} A
          </label>
          <input
            type="text"
            inputMode="numeric"
            name="score_team_1"
            className={`bg-primary-200 h-14 lg:h-20 w-10 
            lg:w-12 rounded-md shadow-inner 
            border border-gray-950 border-opacity-40 text-primary-1100 
            font-semibold text-center text-2xl lg:text-3xl`}
            disabled={!isAdmin || eventStatus !== 'full'}
            defaultValue={scoreTeam1 ?? ''}
          />
          <span className="font-semibold mx-2">-</span>
          <input
            type="text"
            inputMode="numeric"
            name="score_team_2"
            className={`bg-primary-200 h-14 w-10 lg:h-20 lg:w-12 
            rounded-md shadow-inner 
            border border-gray-950 border-opacity-40 text-primary-1100 
            font-semibold text-center text-2xl lg:text-3xl`}
            disabled={!isAdmin || eventStatus !== 'full'}
            defaultValue={scoreTeam2 ?? ''}
          />
          <label htmlFor="score_team_2" className="px-3 text-xs">
            {t('team')} B
          </label>
        </div>
        {eventStatus === 'full' && isAdmin && (
          <Button
            type="submit"
            className="py-1 mt-8"
            isLoading={isLoading}
            textContent={t('save')}
          />
        )}
      </form>
    </Container>
  );
}

export default EventPageScore;
