import React, { useState } from 'react';
import Team from './index.team';
import Button from '../button';
import { EventParticipant } from '@skillcoop/types/src';
import { UseMutateFunction } from '@tanstack/react-query';
import { voteSchema } from '@skillcoop/schema/src';
import { useApp } from '../../../shared/store/app.store';
import { useTranslation } from 'react-i18next';

type TeamCompositionProps = {
  participants: EventParticipant[];
  eventId: number;
  profileId: string;
  nameInput?: string;
  organizer?: string;
  mutationFn?: UseMutateFunction<any, unknown, any, unknown>;
};

function TeamComposition({
  participants,
  eventId,
  profileId,
  nameInput,
  organizer,
  mutationFn,
}: TeamCompositionProps) {
  const { t } = useTranslation('event');
  const { userProfile } = useApp();
  const userProfileId = userProfile?.profile_id;
  const [currentIdpActive, setCurrentIdActive] = useState<string>();
  const handleChangeForm = (e: React.FormEvent<HTMLFormElement>) => {
    setCurrentIdActive((e.target as HTMLElement).id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //ensure that the user can't vote for or select himself
    if (
      (e.target as any)[currentIdpActive as keyof typeof e.target] ===
      userProfileId
    )
      return;
    // rater_id is the profileId from the user who is voting
    // so the user connected
    // profile_id is the profileId from the user who is voted for
    const data = {
      event_id: eventId,
      profile_id: (e.target as any)[currentIdpActive as keyof typeof e.target]
        .value,
      rater_id: profileId,
    };
    if (!mutationFn) return;
    const isValid = voteSchema.safeParse(data);
    if (!isValid.success) return;
    mutationFn(data);
  };

  return (
    <form
      className="mx-2 my-4 flex flex-col 
      rounded-md bg-base-light py-4 shadow"
      onSubmit={handleSubmit}
      onChange={handleChangeForm}
    >
      <h2
        className="flex items-center px-3 py-1.5 text-sm 
        font-semibold lg:rounded-lg"
      >
        {t('teamComposition')}
      </h2>
      <Team
        title={t('team') + ' A'}
        participants={participants}
        teamTofileter={1}
        currentIdActive={currentIdpActive}
        nameInput={nameInput}
        organizer={organizer}
      />
      <div className="flex h-7 justify-between bg-base-light">
        <div className="w-[45%] rounded-r-xl bg-grey-off"></div>
        <div className="w-[45%] rounded-l-xl bg-grey-off"></div>
      </div>
      <Team
        title={t('team') + ' B'}
        participants={participants}
        teamTofileter={2}
        currentIdActive={currentIdpActive}
        nameInput={nameInput}
        organizer={organizer}
      />
      <Button
        type="submit"
        textContent={t('submitYourVote')}
        className="mx-auto my-4"
      />
    </form>
  );
}

export default TeamComposition;
