//@ts-nocheck
import RadarChart from '../../component/radar-chart';
import { useParams } from 'react-router-dom';
import dateHandler from '../../utils/date.handler';
import Container from '../../layout/container';
import { useGetProfile } from '../../hooks/useProfile';
import { getMaxValue } from '../../utils/get-max';
import { useProfileEval } from '../../hooks/useFriendEval';
import strongbox from '../../assets/svg/strongbox.svg';
import flash from '../../assets/svg/flash.svg';
import reward from '../../assets/svg/reward.svg';
import cup from '../../assets/cup.png';
import StatBadge from './stat-badge';
import { sumValues } from '../../utils/sum-values';
import TitleH2 from '../../component/title-h2';
import capitalize from '../../utils/capitalize';
import associateNumberToString from '../../utils/associate-number-stringscale';

function FriendProfile() {
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
      <div className="rounded-xl w-full my-4 overflow-hidden bg-base-light shadow">
        <div className="relative -z-0 h-56 w-full">
          <img
            src="/images/stadium.png"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="relative  flex flex-col 
             pl-6 -top-12 z-10"
        >
          <div className="flex items-center gap-x-5">
            <img
              src={
                profile?.avatar_url
                  ? profile.avatar_url
                  : '/images/default-avatar.png'
              }
              alt="avatar"
              className="h-24 w-24 border-base-light 
                border-3 rounded-md"
            />
            <ul className="hidden md:flex items-center gap-x-5">
              {/* <StatBadge label="Winning Rate" icon={cup} /> */}
              <StatBadge
                label="Attendance"
                value={profile?.nb_attended_events}
                icon={strongbox}
              />
              <StatBadge
                label="Average Skill"
                value={capitalize(
                  associateNumberToString(profile?.last_evaluation ?? 0),
                )}
                icon={flash}
              />
              <StatBadge
                label="Awards"
                value={sumValues(
                  profile?.nb_mvp_bonus,
                  profile?.nb_review,
                  profile?.nb_best_striker_bonus,
                )}
                icon={reward}
              />
            </ul>
          </div>
          <div className="flex justify-between">
            <div>
              <h2 className="text-sm font-semibold">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className="text-xs font-light">{profile?.username}</p>
              <div className="flex items-baseline gap-x-2 py-2">
                {profile?.date_of_birth && (
                  <span className="flex text-xs items-end">
                    <img
                      src="/images/small-profile-green.png"
                      alt="Age icon"
                      className="h-5 w-5"
                    />
                    {dateHandler.getAgeFromDate(profile.date_of_birth)}
                  </span>
                )}
                {profile?.location && (
                  <span className="flex text-xs items-end">
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
            <div className="md:hidden flex-grow flex flex-col gap-y-0.5 text-xs text-light px-6">
              <p>
                Attented to{' '}
                <span className="font-semibold">
                  {profile?.nb_attended_events ?? 0}
                </span>{' '}
                event(s)
              </p>
              <p>
                Received{' '}
                <span className="font-semibold">
                  {sumValues(
                    profile?.nb_mvp_bonus,
                    profile?.nb_review,
                    profile?.nb_best_striker_bonus,
                  )}
                </span>{' '}
                rating or bonus
              </p>

              <p>
                Average skills:{' '}
                <span className="font-semibold">
                  {capitalize(
                    associateNumberToString(profile?.last_evaluation ?? 0),
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row ">
        {hasBeenEvaluated && (
          <Container className="lg:w-1/2 lg:rounded-r-none">
            <TitleH2 title="Stats" />
            {/* TODO : explain the scale and remove magic values */}
            <div className="py-2 max-h-96">
              <RadarChart
                skills={evaluateProfile}
                min={0}
                max={maxValue ? maxValue + 10 : 100}
                displayTicks={false}
              />
            </div>
          </Container>
        )}
        <Container className="lg:w-1/2 lg:rounded-l-none">
          <TitleH2
            title="Shared Events"
            legend={`Last events you shared with ${profile?.username}`}
          />
        </Container>
      </div>
    </>
  );
}

export default FriendProfile;
