import { useApp } from '../../shared/store/app.store';
import { ownSkillSchema } from '@skillcoop/schema/src';
import { useUserProfileEval } from '../../hooks/useUserProfileEval';
import Container from '../../shared/layouts/container';
import LoadingPage from '../../components/loading-page';
import ProfileSkillVisualization from './visual';
import ProfileStats from './stats';

function UserResumeSkills() {
  const { userProfile } = useApp();
  const {
    hasBeenEvaluated,
    autoEvaluate,
    skills: skillValues,
    gbRating,
    loading,
  } = useUserProfileEval({
    profileId: userProfile?.profile_id,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userProfile?.profile_id) return;
    const targetInputs = e.target as any;
    const data = {
      defending: targetInputs.defending.value,
      dribbling: targetInputs.dribbling.value,
      passing: targetInputs.passing.value,
      shooting: targetInputs.shooting.value,
      pace: targetInputs.pace.value,
      profile_id: userProfile.profile_id,
    };
    const isValid = ownSkillSchema.safeParse(data);
    if (!isValid.success) return;
    autoEvaluate(data);
  };

  if (loading) return <LoadingPage />;

  return (
    <Container
      className="flex w-full flex-grow flex-col gap-y-6 lg:mt-4 
      lg:flex-row"
    >
      <div className="basis-1/2">
        <ProfileStats
          gbRating={gbRating}
          nbAttendedEvents={userProfile?.nb_attended_events}
          winningRate={userProfile?.winning_rate}
          nbMvpBonus={userProfile?.nb_mvp_bonus}
          nbReview={userProfile?.nb_review}
          nbBestStrikerBonus={userProfile?.nb_best_striker_bonus}
        />
      </div>
      <div className="basis-1/2">
        <ProfileSkillVisualization
          hasBeenEvaluated={hasBeenEvaluated}
          skillValues={skillValues}
          handleSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
}
export default UserResumeSkills;
