import React from 'react';
import { saveScoreSchema, updateEventSchema } from '@skillcoop/schema/src';
import Button from '../../../shared/components/button';
import { useApp } from '../../../shared/store/app.store';
import type { EventStatus } from '@skillcoop/types/src';
import { eventStatus as eventStatusAssertion } from '@skillcoop/types/src';
import {
  useUpdateScoreEvent,
  useUpdateSingleEvent,
} from '../../../shared/hooks/useSingleEvent';
import toast from '../../../shared/utils/toast';
import Container from '../../../shared/layouts/container';
import TitleH2 from '../../../shared/components/title-h2';
import { useEvent } from '../store/event.store';
import { useTranslation } from 'react-i18next';

type EventPageScoreProps = {
  eventId: number;
  isAdmin: boolean;
  scoreTeam1: number | null;
  scoreTeam2: number | null;
  eventDate: string | null;
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
    if (
      !isScoreDataValid.success ||
      !isStatusDataValid.success ||
      !profileId ||
      !eventDate
    )
      return;
    if (new Date(eventDate) > new Date()) {
      toast.error(t('toast:cannontSaveScore'));
      return;
    }
    saveScore(postScoreData);
    updateStatusEvent(patchEventData);
  };

  if (eventStatus === 'cancelled') return null;
  if (eventStatus === 'open') return null;
  return (
    <Container className="flex min-w-[335px] flex-col lg:rounded-lg">
      <TitleH2 title={t('finalScore')} />
      {/* "bg-base-light mx-2 rounded-md py-4 px-3 flex flex-col items-center
      justify-between w-full" */}
      <form
        className={`mx-2 flex w-full 
        flex-col items-center justify-between rounded-md bg-base-light 
        px-3 py-4`}
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
            className={`h-14 w-10 rounded-md border 
            border-gray-950 border-opacity-40 bg-primary-200 
            text-center text-2xl font-semibold text-primary-1100 
            shadow-inner lg:h-20 lg:w-12 lg:text-3xl`}
            disabled={!isAdmin || eventStatus !== 'full'}
            defaultValue={scoreTeam1 ?? ''}
          />
          <span className="mx-2 font-semibold">-</span>
          <input
            type="text"
            inputMode="numeric"
            name="score_team_2"
            className={`h-14 w-10 rounded-md border border-gray-950 
            border-opacity-40 bg-primary-200 
            text-center text-2xl font-semibold text-primary-1100 
            shadow-inner lg:h-20 lg:w-12 lg:text-3xl`}
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
            className="mt-8 py-1"
            isLoading={isLoading}
            textContent={t('save')}
          />
        )}
      </form>
    </Container>
  );
}

export default EventPageScore;
