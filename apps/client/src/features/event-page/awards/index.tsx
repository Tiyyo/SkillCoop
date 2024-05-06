/* eslint-disable indent*/
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { EventParticipant } from '@skillcoop/types/src';
import TeamComposition from '../../../shared/components/team-composition';
import toast from '../../../shared/utils/toast';
import {
  useGetSingleEvent,
  useVoteForMvp,
  useVoteForbestStriker,
} from '../../../shared/hooks/useSingleEvent';
import { useTranslation } from 'react-i18next';
import { MotionTabs } from './motion-tab';

type LocationState = {
  eventId?: number;
  participants?: EventParticipant[];
  profileId?: string;
};

function EndOfGameAwards() {
  const { t } = useTranslation('event');
  const { state } = useLocation();
  const [locationStateInfos, setLocationStateInfos] = useState<LocationState>({
    eventId: undefined,
    participants: undefined,
    profileId: undefined,
  });
  const { data: event } = useGetSingleEvent({
    eventId: locationStateInfos.eventId,
    profileId: locationStateInfos.profileId,
  });

  const { mutate: voteMvp } = useVoteForMvp({
    eventId: locationStateInfos.eventId,

    onSuccess: () => {
      toast.success(t('yourVoteHasBeenRecorded'));
    },
    onError: () => {
      toast.error(t('youAlreadyVoted'));
    },
  });

  const { mutate: voteBestStriker } = useVoteForbestStriker({
    eventId: locationStateInfos.eventId,
    onSuccess: () => {
      toast.success(t('yourVoteHasBeenRecorded'));
    },
    onError: () => {
      toast.error(t('youAlreadyVoted'));
    },
  });

  useEffect(() => {
    if (!state) return;
    if (state.eventId && state.participants && state.profileId) {
      setLocationStateInfos((prev) => {
        return {
          ...prev,
          eventId: state.eventId,
          participants: state.participants,
          profileId: state.profileId,
        };
      });
    }
  }, [state]);

  const tryTabs = [
    {
      title: t('player'),
      value: 'mvp',
      content: (
        <>
          {locationStateInfos.participants &&
            locationStateInfos.eventId &&
            locationStateInfos.profileId && (
              <TeamComposition
                participants={locationStateInfos.participants}
                eventId={locationStateInfos.eventId}
                profileId={locationStateInfos.profileId}
                organizer={event?.organizer_id}
                nameInput="mvp"
                mutationFn={voteMvp}
              />
            )}
        </>
      ),
    },
    {
      title: t('striker'),
      value: 'striker',
      content: (
        <>
          {locationStateInfos.participants &&
            locationStateInfos.eventId &&
            locationStateInfos.profileId && (
              <TeamComposition
                participants={locationStateInfos.participants}
                eventId={locationStateInfos.eventId}
                profileId={locationStateInfos.profileId}
                organizer={event?.organizer_id}
                nameInput="striker"
                mutationFn={voteBestStriker}
              />
            )}
        </>
      ),
    },
  ];

  return (
    <>
      <h2 className="pt-2 font-semibold text-primary-1100">
        {t('voteNowForTheBest')} :
      </h2>{' '}
      <MotionTabs tabs={tryTabs} containerClassName="py-4 text-text-base" />
    </>
  );
}

export default EndOfGameAwards;
