import { cn } from '../../lib/utils';
import capitalize from '../../utils/capitalize';
import GroupedStars from '../star-rating';
import '../star-rating/rating-input.css';
import { Button } from '../../lib/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EvaluationParticipantSkill } from '../../types';
import {
  evaluateParticipantSkillsFn,
  getAverageSkillFn,
} from '../../api/api.fn';
import { useApp } from '../../store/app.store';
import schema from 'schema';
import { useEffect, useState } from 'react';
import associateNumberToString from '../../utils/associate-number-stringscale';
const { participantSkillSchema } = schema;

interface ModalRatingParticipantProps {
  eventId: number;
  participantProfileId: number;
  participantUsername: string;
  participantAvatar: string;
}

function ModalRatingParticipant({
  eventId,
  participantProfileId,
  participantUsername,
  participantAvatar,
}: ModalRatingParticipantProps) {
  const { userProfile } = useApp();
  const userProfileId = userProfile?.profile_id;
  const [hasBeenRated, setHasBeenRated] = useState(false);
  const skills = ['defending', 'dribbling', 'passing', 'shooting', 'pace'];
  const { mutate: evaluateSkills } = useMutation(
    (data: EvaluationParticipantSkill) => evaluateParticipantSkillsFn(data)
  );
  const {
    data: averageSkill,
    refetch,
    isSuccess,
    isError,
    isLoading,
    isFetching,
    remove,
  } = useQuery(
    ['averageSkill'],
    () => {
      console.log(userProfileId);
      if (!userProfileId) return;
      return getAverageSkillFn({
        event_id: eventId,
        rater_id: userProfileId,
        reviewee_id: participantProfileId,
      });
    },
    { enabled: true, refetchOnMount: true }
  );

  const handleSubmitEvaluation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userProfileId) return;
    const data = {
      defending: Number(
        e.target['defending-rating' as keyof typeof e.target].value
      ),
      dribbling: Number(
        e.target['dribbling-rating' as keyof typeof e.target].value
      ),
      passing: Number(
        e.target['passing-rating' as keyof typeof e.target].value
      ),
      shooting: Number(
        e.target['shooting-rating' as keyof typeof e.target].value
      ),
      pace: Number(e.target['pace-rating' as keyof typeof e.target].value),
      reviewee_id: participantProfileId,
      rater_id: userProfileId,
      event_id: eventId,
    };
    const isValid = participantSkillSchema.safeParse(data);
    if (!isValid.success) return;
    evaluateSkills(data);
    setHasBeenRated(true);
  };

  useEffect(() => {
    console.log('success has work');
    if (averageSkill) {
      setHasBeenRated(true);
    }
    console.log(hasBeenRated);
  }, [averageSkill]);

  useEffect(() => {
    refetch();
    return () => {
      remove();
    };
  }, []);

  return (
    <>
      <div className="flex gap-6 items-center">
        <img
          src={
            participantAvatar ? participantAvatar : '/images/default-avatar.png'
          }
          alt="avatar"
          className={cn('w-16 h-16 rounded-full')}
        />
        <p>{capitalize(participantUsername)}</p>
      </div>
      {averageSkill && (
        <p className="text-xs text-light text-center">
          You have evaluated{' '}
          <span className="font-semibold">
            {capitalize(participantUsername)}
          </span>{' '}
          performance at an{' '}
          <span className="text-primary-1000 font-semibold">
            {associateNumberToString(averageSkill.rating)}
          </span>{' '}
          level for this event.
        </p>
      )}
      {!hasBeenRated && (
        <p className="text-xs text-light text-center">
          You can evaluate the skill of{' '}
          <span>{capitalize(participantUsername)}</span> on this event. This can
          help to make the balanced of generated team more accurate
        </p>
      )}
      {!hasBeenRated && (
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmitEvaluation}>
          {skills.map((skill, index) => (
            <GroupedStars
              key={index}
              legend={capitalize(skill)}
              name={`${skill}-rating`}
            />
          ))}
          <Button
            type="submit"
            className="bg-primary-700 text-white self-center my-4 hover:opacity-75 duration-300 transition-opacity tracking-wide">
            Send evaluation
          </Button>
        </form>
      )}
    </>
  );
}

export default ModalRatingParticipant;
