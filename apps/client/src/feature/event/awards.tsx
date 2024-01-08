/* eslint-disable indent*/
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../lib/ui/tabs';
import { useEffect, useState } from 'react';
import type { EventParticipant } from '@skillcoop/types/src';
import TeamComposition from '../../component/team-composition';
import toast from '../../utils/toast';
import {
  useVoteForMvp,
  useVoteForbestStriker,
} from '../../hooks/useSingleEvent';
import { useTranslation } from 'react-i18next';

type LocationState = {
  eventId?: number;
  participants?: EventParticipant[];
  profileId?: number;
};

function EndOfGameAwards() {
  const { t } = useTranslation('event');
  const { state } = useLocation();
  const [locationStateInfos, setLocationStateInfos] = useState<LocationState>({
    eventId: undefined,
    participants: undefined,
    profileId: undefined,
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

  return (
    <>
      <Tabs
        defaultValue="account"
        className="w-full flex flex-col justify-center"
      >
        <h2 className="p-4 font-semibold text-primary-1100">
          {t('voteNowForTheBest')} :
        </h2>
        <TabsList className="flex">
          <TabsTrigger value="mvp" className="w-1/2 max-w-xl border">
            {t('player')}
          </TabsTrigger>
          <TabsTrigger value="striker" className="w-1/2 max-w-xl border">
            {t('striker')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mvp">
          {locationStateInfos.participants &&
            locationStateInfos.eventId &&
            locationStateInfos.profileId && (
              <TeamComposition
                participants={locationStateInfos.participants}
                eventId={locationStateInfos.eventId}
                profileId={locationStateInfos.profileId}
                nameInput="mvp"
                mutationFn={voteMvp}
              />
            )}
        </TabsContent>
        <TabsContent value="striker">
          {locationStateInfos.participants &&
            locationStateInfos.eventId &&
            locationStateInfos.profileId && (
              <TeamComposition
                participants={locationStateInfos.participants}
                eventId={locationStateInfos.eventId}
                profileId={locationStateInfos.profileId}
                nameInput="striker"
                mutationFn={voteBestStriker}
              />
            )}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default EndOfGameAwards;
