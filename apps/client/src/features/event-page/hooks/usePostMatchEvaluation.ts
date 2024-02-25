import { useEffect, useState } from 'react';
import { useApp } from '../../../shared/store/app.store';
import {
  useEvaluationSkill,
  useGetAverageEval,
  useGetProfile,
} from '../../../shared/hooks/useProfile';
import { ALL_SKILLS } from '../../../shared/constants/skill-constant';
import {
  participantSkillSchema,
  EvaluationParticipantSkill,
} from '@skillcoop/schema/src';
import toast from '../../../shared/utils/toast';
import { useNavigate } from 'react-router-dom';

type usePostMatchEvaluationProps = {
  eventId?: number | string;
  participantProfileId?: string;
};

function usePostMatchEvaluation({
  eventId,
  participantProfileId,
}: usePostMatchEvaluationProps) {
  const { userProfile } = useApp();
  const navigate = useNavigate();
  // get the profile of the participant
  const { data: participantProfile } = useGetProfile({
    profileId: participantProfileId,
    enabled: !!participantProfileId,
  });

  // Let user to evaluate the participant
  const { mutate: evaluateParticipant } = useEvaluationSkill({});

  // Retrieve the evaluation of the participant if it exists
  const { data: participantEvaluation } = useGetAverageEval({
    eventId: Number(eventId),
    participantProfileId: participantProfileId,
    userProfileId: userProfile?.profile_id,
  });

  const [evaluation, setEvaluation] = useState<number | undefined>();
  useEffect(() => {
    if (!participantEvaluation || !participantEvaluation.rating) return;
    setEvaluation(participantEvaluation.rating);
  }, [participantEvaluation]);

  // Form data submission
  const handleEvaluationSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userProfile?.profile_id || !participantProfileId) return;
    const submitedEvaluation = ALL_SKILLS.reduce<
      Partial<EvaluationParticipantSkill>
    >(
      (acc, curr) => {
        return {
          ...acc,
          [curr]: Number(e.currentTarget[`${curr}-rating`].value),
        };
      },
      {
        reviewee_id: participantProfileId,
        rater_id: userProfile?.profile_id,
        event_id: Number(eventId),
      },
    ) as unknown as EvaluationParticipantSkill;
    const isValid = participantSkillSchema.safeParse(submitedEvaluation);
    if (!isValid.success) {
      toast.error('You need to fill all the input');
      return;
    }
    evaluateParticipant(submitedEvaluation);
    const sum =
      submitedEvaluation.defending +
      submitedEvaluation.dribbling +
      submitedEvaluation.pace +
      submitedEvaluation.passing +
      submitedEvaluation.shooting;
    setEvaluation(Math.floor(sum) / 5);
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  return {
    participantProfile,
    participantEvaluation,
    evaluation,
    handleEvaluationSubmission,
  };
}

export default usePostMatchEvaluation;
