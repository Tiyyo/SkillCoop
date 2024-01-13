import { useEffect, useState } from 'react';
import { useApp } from '../store/app.store';
import {
  useEvaluationSkill,
  useGetAverageEval,
  useGetProfile,
} from './useProfile';
import { ALL_SKILLS } from '../constant/skill-constant';
import { participantSkillSchema } from '@skillcoop/schema/src';
import toast from '../utils/toast';
import { EvaluationParticipantSkill } from '@skillcoop/types/src';
import { useNavigate } from 'react-router-dom';

type usePostMatchEvaluationProps = {
  eventId?: number | string;
  participantProfileId?: number | string;
};

function usePostMatchEvaluation({
  eventId,
  participantProfileId,
}: usePostMatchEvaluationProps) {
  const { userProfile } = useApp();
  const navigate = useNavigate();
  // get the profile of the participant
  const { data: participantProfile } = useGetProfile({
    profileId: Number(participantProfileId),
    enabled: !!participantProfileId,
  });

  // Let user to evaluate the participant
  const { mutate: evaluateParticipant } = useEvaluationSkill({});

  // Retrieve the evaluation of the participant if it exists
  const { data: participantEvaluation } = useGetAverageEval({
    eventId: Number(eventId),
    participantProfileId: Number(participantProfileId),
    userProfileId: userProfile?.profile_id,
  });

  const [evaluation, setEvaluation] = useState<number | undefined>(
    participantEvaluation?.rating,
  );
  useEffect(() => {
    if (!participantEvaluation || !participantEvaluation.rating) return;
    setEvaluation(participantEvaluation.rating);
  }, [participantEvaluation]);

  // Form data submission
  const handleEvaluationSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userProfile?.profile_id) return;
    const submitedEvaluation = ALL_SKILLS.reduce(
      (acc, curr) => {
        return {
          ...acc,
          [curr]: Number(e.currentTarget[`${curr}-rating`].value),
        };
      },
      {
        reviewee_id: Number(participantProfileId),
        rater_id: userProfile?.profile_id,
        event_id: Number(eventId),
      },
    ) as EvaluationParticipantSkill;

    const isValid = participantSkillSchema.safeParse(submitedEvaluation);
    if (!isValid.success) {
      toast.error('You need to fill all the input');
      return;
    }
    evaluateParticipant(submitedEvaluation);
    setEvaluation(
      Math.floor(
        submitedEvaluation.defending +
          submitedEvaluation.dribbling +
          submitedEvaluation.pace +
          submitedEvaluation.passing +
          submitedEvaluation.shooting,
      ) / 5,
    );
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
