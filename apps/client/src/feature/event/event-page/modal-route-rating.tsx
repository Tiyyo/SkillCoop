import { X } from 'lucide-react';
import Spinner from '../../../component/loading';
import Button from '../../../component/button';
import GroupedStars from '../../../component/star-rating';
import {
  evaluateParticipantSkillsFn,
  getAverageSkillFn,
  getProfileFn,
} from '../../../api/api.fn';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useApp } from '../../../store/app.store';
import capitalize from '../../../utils/capitalize';
/* eslint-disable-next-line */
import associateNumberToString from '../../../utils/associate-number-stringscale';
import { useNavigate, useParams } from 'react-router-dom';
import { participantSkillSchema } from 'schema/ts-schema';
import type { EvaluationParticipantSkill } from 'skillcoop-types';
import { cn } from '../../../lib/utils';

// Shitty component, need to be refactored or rewrite
function ModalRouteRatingEvent() {
  const { userProfile } = useApp();
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [evaluation, setEvaluation] = useState<number | null>(null);
  const { eventId, profileId: participantProfileId } = useParams<{
    eventId: string;
    profileId: string;
  }>();
  const userProfileId = userProfile?.profile_id;
  const [hasBeenRated, setHasBeenRated] = useState(false);
  const skills = ['defending', 'dribbling', 'passing', 'shooting', 'pace'];

  const { data: participantProfile } = useQuery(['test'], () =>
    getProfileFn(Number(participantProfileId)),
  );

  const {
    data: averageSkill,
    isLoading,
    isFetching,
  } = useQuery([`eval${eventId}/${participantProfileId}`], () => {
    if (!userProfileId) return;
    return getAverageSkillFn({
      event_id: Number(eventId),
      rater_id: Number(userProfileId),
      reviewee_id: Number(participantProfileId),
    });
  });

  const { mutate: evaluateSkills } = useMutation(
    (data: EvaluationParticipantSkill) => evaluateParticipantSkillsFn(data),
  );

  // TODO : fix type or find another way to do it
  //@ts-nocheck
  const handleSubmitEvaluation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userProfileId) return;
    const target = e.target as HTMLFieldSetElement;
    const data = {
      defending: Number(
        //@ts-ignore
        target['defending-rating' as keyof typeof e.target].value,
      ),
      dribbling: Number(
        //@ts-ignore
        target['dribbling-rating' as keyof typeof e.target].value,
      ),
      //@ts-ignore
      passing: Number(target['passing-rating' as keyof typeof e.target].value),
      shooting: Number(
        //@ts-ignore
        target['shooting-rating' as keyof typeof e.target].value,
      ),
      //@ts-ignore
      pace: Number(target['pace-rating' as keyof typeof e.target].value),
      reviewee_id: Number(participantProfileId),
      rater_id: userProfileId,
      event_id: Number(eventId),
    };
    //@ts-ignore
    const isValid = participantSkillSchema.safeParse(data);
    if (!isValid.success) return;
    evaluateSkills(data);
    const average = Math.floor(
      (data.defending +
        data.dribbling +
        data.passing +
        data.shooting +
        data.pace) /
        5,
    );
    setEvaluation(average);
    setHasBeenRated(true);
  };
  const loading = isLoading || isFetching;

  useEffect(() => {
    setHasLoaded(loading);
    if (averageSkill && averageSkill.rating) {
      setHasBeenRated(true);
      setEvaluation(averageSkill.rating);
    }
  }, [averageSkill, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!eventId || !participantProfileId) {
        navigate(-1);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [eventId, participantProfileId]);

  return (
    <div
      className="fixed max-h-screen overflow-hidden inset-0 z-50 
          bg-background/80 backdrop-blur-sm "
    >
      <div
        className="bg-base-light  fixed left-[50%] top-[50%] z-50 
          grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] 
          gap-4 border bg-background p-6 shadow-lg duration-200 
          animate-in sm:rounded-lg md:w-full animate-in animate-fade-in"
      >
        <div className="flex justify-end">
          <X
            size={24}
            className="cursor-pointer hover:opacity-75 hover:text-primary-1000 
duration-300 transition-color"
            onClick={() => navigate(-1)}
          />
        </div>
        <>
          {!hasLoaded ? (
            <>
              <div className="flex gap-6 items-center">
                <img
                  src={
                    participantProfile?.avatar_url
                      ? participantProfile?.avatar_url
                      : '/images/default-avatar.png'
                  }
                  alt="avatar"
                  className={cn('w-16 h-16 rounded-full')}
                />
                <p>{capitalize(participantProfile?.username)}</p>
              </div>
              {evaluation && (
                <p className="text-xs text-light text-center">
                  You have evaluated{' '}
                  <span className="font-semibold">
                    {capitalize(participantProfile?.username)}
                  </span>{' '}
                  performance at an{' '}
                  <span className="text-primary-1000 font-semibold">
                    {associateNumberToString(evaluation)}
                  </span>{' '}
                  level for this event.
                </p>
              )}
              {!hasBeenRated && (
                <p className="text-xs text-light text-center">
                  You can evaluate the skill of{' '}
                  <span>{capitalize(participantProfile?.username)}</span> on
                  this event. This can help to make the balanced of generated
                  team more accurate
                </p>
              )}
              {!hasBeenRated && (
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleSubmitEvaluation}
                >
                  {skills.map((skill, index) => (
                    <GroupedStars
                      key={index}
                      legend={capitalize(skill)}
                      name={`${skill}-rating`}
                    />
                  ))}
                  <Button
                    type="submit"
                    variant="light"
                    textContent="Send evaluation"
                  />
                </form>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </>
      </div>
    </div>
  );
}

export default ModalRouteRatingEvent;
