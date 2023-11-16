//@ts-nocheck
import RadarChart from '../../component/radar-chart';
import { useParams } from 'react-router-dom';
import ReturnBtn from '../../component/return';
import dateHandler from '../../utils/date.handler';
import Container from '../../layout/container';
import { useGetProfile } from '../../hooks/useProfile';
import { getMaxValue } from '../../utils/get-max';
import { useProfileEval } from '../../hooks/useProfileEval';
import InfosFieldFriendProfile from './infos-field';
import ProfileSkillsResume from '../../component/profile-skills-resume';

function FriendProfile() {
  const params = useParams<{ id: string }>();
  const profileId = Number(params.id);
  const { data: profile } = useGetProfile({ profileId });
  const { hasBeenEvaluated, evaluateProfile } = useProfileEval({ profileId });
  const values = Object.values(evaluateProfile);
  const maxValue = getMaxValue(values);
  return (
    <>
      <ReturnBtn />
      <h2 className="text-lg font-semibold px-3 py-2">Infos</h2>
      <Container>
        <div className="flex items-start gap-4">
          <img
            src={
              profile?.avatar_url
                ? profile.avatar_url
                : '/images/default-avatar.png'
            }
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
          <div className="w-full">
            <dl
              className="flex flex-col justify-between -my-3 divide-y
                       divide-gray-100 text-sm py-1 w-full"
            >
              <InfosFieldFriendProfile
                name="Username"
                content={profile?.username}
              />
              <InfosFieldFriendProfile
                name="Firstname"
                content={profile?.first_name}
              />
              <InfosFieldFriendProfile
                name="Lastname"
                content={profile?.last_name}
              />
              <InfosFieldFriendProfile
                name="Age"
                content={dateHandler.getAgeFromDate(profile?.date_of_birth)}
              />
              <InfosFieldFriendProfile
                name="Location"
                content={profile?.location}
              />
            </dl>
          </div>
        </div>
      </Container>
      <>
        <h2 className="text-lg font-semibold px-3 py-2">Skills</h2>
        <ProfileSkillsResume
          username={profile?.username}
          nbAtentedEvents={profile?.nb_attended_events}
          nbMvpBonus={profile?.nb_mvp_bonus}
          nbReview={profile?.nb_review}
          nbBestStrikerBonus={profile?.nb_best_striker_bonus}
          lastEvaluation={profile?.last_evaluation}
        />
      </>
      {hasBeenEvaluated && (
        <Container>
          {/* TODO : explain the scale and remove magic values */}
          <RadarChart
            skills={evaluateProfile}
            min={0}
            max={maxValue ? maxValue + 10 : 100}
            displayTicks={false}
          />
        </Container>
      )}
    </>
  );
}

export default FriendProfile;
