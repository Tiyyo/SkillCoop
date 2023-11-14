import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../lib/ui/tabs';
import { useEffect, useState } from 'react';
import { EventParticipant } from '../../types';
import TeamComposition from '../../component/team-composition';
import toast from '../../utils/toast';
import ReturnBtn from '../../component/return';
import {
  useVoteForMvp,
  useVoteForbestStriker,
} from '../../hooks/useSingleEvent';

type LocationState = {
  eventId?: number;
  participants?: EventParticipant[];
  profileId?: number;
};

function EndOfGameAwards() {
  const { state } = useLocation();
  const [locationStateInfos, setLocationStateInfos] = useState<LocationState>({
    eventId: undefined,
    participants: undefined,
    profileId: undefined,
  });
  const { mutate: voteMvp } = useVoteForMvp({
    eventId: locationStateInfos.eventId,
    onSuccess: () => {
      toast.success('Your vote has been recorded');
    },
    onError: () => {
      toast.error('You already voted for this category');
    },
  });

  const { mutate: voteBestStriker } = useVoteForbestStriker({
    eventId: locationStateInfos.eventId,
    onSuccess: () => {},
    onError: () => {
      toast.error('You already voted for this category');
    },
  });

  useEffect(() => {
    if (!state) return;
    if (state.eventId) {
      setLocationStateInfos((prev) => {
        return {
          ...prev,
          eventId: state.eventId,
        };
      });
    }
    if (state.participants) {
      setLocationStateInfos((prev) => {
        return {
          ...prev,
          participants: state.participants,
        };
      });
    }
    if (state.eventId) {
      setLocationStateInfos((prev) => {
        return {
          ...prev,
          profileId: state.profileId,
        };
      });
    }
  }, [state]);

  return (
    <>
      <ReturnBtn />
      <Tabs
        defaultValue="account"
        className="w-full flex flex-col justify-center"
      >
        <h2 className="p-4 font-semibold text-primary-1100">
          Vote now for the best :
        </h2>
        <TabsList className="flex">
          <TabsTrigger value="mvp" className="w-1/2 max-w-xl border">
            Player
          </TabsTrigger>
          <TabsTrigger value="striker" className="w-1/2 max-w-xl border">
            Striker
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
