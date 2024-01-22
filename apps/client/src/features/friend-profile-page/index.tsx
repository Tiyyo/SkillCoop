import RadarChart from '../../components/radar-chart';
import { useParams } from 'react-router-dom';
import Container from '../../layouts/container';
import { useGetProfile } from '../../hooks/useProfile';
import { getMaxValue } from '../../utils/get-max';
import { useProfileEval } from '../../hooks/useFriendEval';
// import cup from '../../assets/cup.png';
import TitleH2 from '../../components/title-h2';
import capitalize from '../../utils/capitalize';
import FriendStatsDesktop from './stats-desktop';
import AvatarRectangle from '../../components/avatar-rectangle';
import FriendStatsMobile from './stats-mobile';
import { getAge } from '@skillcoop/date-handler/src';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function FriendProfile() {
  const { t } = useTranslation('title');
  const params = useParams<{ id: string }>();
  const profileId = Number(params.id);
  const { data: profile } = useGetProfile({ profileId });
  const { hasBeenEvaluated, evaluateProfile } = useProfileEval({ profileId });
  const values = Object.values(evaluateProfile);
  const maxValue = getMaxValue(values);

  //TODO : refactor this component
  //TODO: add last share events
  //TODO: add win rate
  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <div className="w-full bg-base-light shadow   lg:my-4 lg:rounded-xl">
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
              <AvatarRectangle avatar={profile?.avatar_url ?? null} />

              <FriendStatsDesktop
                nbAttendedEvent={profile?.nb_attended_events}
                nbMvpBonus={profile?.nb_mvp_bonus}
                nbReview={profile?.nb_review}
                nbBestStrikerBonus={profile?.nb_best_striker_bonus}
                lastEvaluation={profile?.last_evaluation}
              />
            </div>
            <div className="flex justify-between ">
              <div>
                <h2 className="text-sm font-semibold">
                  {capitalize(profile?.first_name)}{' '}
                  {capitalize(profile?.last_name)}
                </h2>
                <p className="text-xs font-light">{profile?.username}</p>
                <div className="flex items-baseline gap-x-2 py-2">
                  {profile?.date_of_birth && (
                    <span className="flex items-end text-xs">
                      <img
                        src="/images/small-profile-green.png"
                        alt="Age icon"
                        className="h-5 w-5"
                      />
                      {getAge(profile.date_of_birth)}
                    </span>
                  )}
                  {profile?.location && (
                    <span className="flex items-end text-xs">
                      <img
                        src="/images/location.png"
                        alt="location icon"
                        className="h-5 w-5"
                      />
                      {profile.location}
                    </span>
                  )}
                </div>
              </div>
              <Suspense fallback={<div>loading</div>}>
                <FriendStatsMobile
                  nbAttendedEvent={profile?.nb_attended_events}
                  nbMvpBonus={profile?.nb_mvp_bonus}
                  nbReview={profile?.nb_review}
                  nbBestStrikerBonus={profile?.nb_best_striker_bonus}
                  lastEvaluation={profile?.last_evaluation}
                />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row ">
          {/*      TODO : move this into his own component */}
          {hasBeenEvaluated && (
            <Container className="lg:w-1/2 lg:rounded-r-none">
              <TitleH2 title={t('stats')} />
              <div className="max-h-96 py-2">
                <RadarChart
                  skills={evaluateProfile}
                  min={0}
                  // set the scale to a max of the highest score of an user
                  // to have a consistent scale
                  max={maxValue ? maxValue + 10 : 100}
                  displayTicks={false}
                />
              </div>
            </Container>
          )}
          <Container className="lg:w-1/2 lg:rounded-l-none">
            <TitleH2
              title={t('sharedEvents')}
              legend={t('sharedEventsLegend', { username: profile?.username })}
            />
          </Container>
        </div>
      </Suspense>
    </>
  );
}

export default FriendProfile;
