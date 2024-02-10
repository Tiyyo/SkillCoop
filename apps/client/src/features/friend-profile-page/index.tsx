import { useParams } from 'react-router-dom';
import { useGetProfile } from '../../shared/hooks/useProfile';
import { getMaxValue } from '../../shared/utils/get-max';
import { useProfileEval } from './hooks/useFriendEval';
import FriendStatsDesktop from './stats-desktop';
import FriendStatsMobile from './stats-mobile';
import { Suspense } from 'react';
import SharedEvents from './shared-event';
import { useApp } from '../../shared/store/app.store';
import { useGetSharedEvents } from '../event-list/hooks/useMultipleEvents';
import FriendProfileStatsVisualization from './visual';
import FriendProfileInfos from './infos';

function FriendProfile() {
  const { userId } = useApp();
  const params = useParams<{ id: string }>();
  const profileId = Number(params.id);
  const { data: profile } = useGetProfile({ profileId });
  const { hasBeenEvaluated, evaluateProfile } = useProfileEval({ profileId });
  const { data: sharedEvents } = useGetSharedEvents({
    profileId: userId,
    friendId: profileId,
  });
  const values = Object.values(evaluateProfile);
  const maxValue = getMaxValue(values);
  //TODO : refactor this component

  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <div className="w-full bg-base-light shadow   lg:my-4 lg:rounded-xl">
          {/*banner*/}
          <div className="relative -z-0 h-56 w-full ">
            <img
              src="/images/stadium.png"
              alt="banner"
              className="h-full w-full object-cover lg:rounded-t-xl"
            />
          </div>
          <div
            className="relative  -top-12 z-10 
             flex flex-col pl-6"
          >
            <div className="flex items-center gap-x-5">
              <FriendProfileInfos
                avatar={profile?.avatar_url}
                firstname={profile?.first_name}
                lastname={profile?.last_name}
                age={profile?.date_of_birth}
                location={profile?.location}
                username={profile?.username}
              />
              <FriendStatsDesktop
                nbAttendedEvent={profile?.nb_attended_events}
                nbMvpBonus={profile?.nb_mvp_bonus}
                nbReview={profile?.nb_review}
                nbBestStrikerBonus={profile?.nb_best_striker_bonus}
                lastEvaluation={profile?.last_evaluation}
                winningRate={profile?.winning_rate}
              />
            </div>
            <div>
              <Suspense fallback={<div>loading</div>}>
                <FriendStatsMobile
                  nbAttendedEvent={profile?.nb_attended_events}
                  nbMvpBonus={profile?.nb_mvp_bonus}
                  nbReview={profile?.nb_review}
                  nbBestStrikerBonus={profile?.nb_best_striker_bonus}
                  lastEvaluation={profile?.last_evaluation}
                  winningRate={profile?.winning_rate}
                />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row ">
          {hasBeenEvaluated && (
            <FriendProfileStatsVisualization
              evaluateProfile={evaluateProfile}
              maxValue={maxValue}
            />
          )}
          <SharedEvents
            username={profile?.username ?? ''}
            events={sharedEvents}
          />
        </div>
      </Suspense>
    </>
  );
}

export default FriendProfile;
