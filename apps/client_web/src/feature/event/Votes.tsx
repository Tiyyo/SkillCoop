import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../lib/ui/tabs';
import { useEffect } from 'react';
import { EventParticipant, Vote } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { voteBestStrikerFn, voteMvpFn } from '../../api/api.fn';
import TeamComposition from '../../component/team-composition';
import toast from '../../utils/toast';
import ReturnBtn from '../../component/return';

type LocationState = {
  eventId: number;
  participants: EventParticipant[];
  profileId: number;
};

function Votes() {
  const { state } = useLocation();
  const { eventId, participants, profileId } = state as LocationState;

  const {
    mutate: voteMvp,
    isError: errorMvp,
    isSuccess: successMvp,
    isLoading: loadMvp,
  } = useMutation((data: Vote) => voteMvpFn(data));
  const {
    mutate: voteBestStriker,
    isError: errorStriker,
    isSuccess: successStriker,
    isLoading: loadStriker,
  } = useMutation((data: Vote) => voteBestStrikerFn(data));

  const loading = loadMvp || loadStriker;
  const error = errorMvp || errorStriker;
  const success = successMvp || successStriker;

  useEffect(() => {
    if (loading) return;
    if (error) {
      toast.error('You already voted for this category');
    }
    if (success) {
      toast.success('Your vote has been recorded');
    }
  }, [loading]);

  return (
    <>
      <ReturnBtn />
      <Tabs
        defaultValue="account"
        className="w-full flex flex-col justify-center">
        <h2 className="p-4 font-semibold text-primary-1100">
          Vote now for the best :
        </h2>
        <TabsList className="flex">
          <TabsTrigger
            value="mvp"
            className="w-1/2 max-w-xl border">
            Player
          </TabsTrigger>
          <TabsTrigger
            value="striker"
            className="w-1/2 max-w-xl border">
            Striker
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mvp">
          <TeamComposition
            participants={participants}
            eventId={eventId}
            profileId={profileId}
            nameInput="mvp"
            mutationFn={voteMvp}
          />
        </TabsContent>
        <TabsContent value="striker">
          <TeamComposition
            participants={participants}
            eventId={eventId}
            profileId={profileId}
            nameInput="striker"
            mutationFn={voteBestStriker}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Votes;
