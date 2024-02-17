import { X } from 'lucide-react';
import Button from '../../../shared/components/button';
import GroupedStars from '../../../shared/components/star-rating';
import { Suspense } from 'react';
import capitalize from '../../../shared/utils/capitalize';
/* eslint-disable-next-line */
import associateNumberToString from '../../../shared/utils/associate-number-string-scale';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import ImageWithFallback from '../../../shared/components/image/index';
import { ALL_SKILLS } from '../../../shared/constants/skill-constant';
import usePostMatchEvaluation from '../hooks/usePostMatchEvaluation';

// Shitty component, need to be refactored or rewrite
function ModalRouteRatingEvent() {
  const { t } = useTranslation('skill');
  const navigate = useNavigate();
  const { eventId, profileId: participantProfileId } = useParams<{
    eventId: string;
    profileId: string;
  }>();
  const {
    participantProfile,
    participantEvaluation,
    evaluation,
    handleEvaluationSubmission,
  } = usePostMatchEvaluation({
    eventId,
    participantProfileId,
  });

  return (
    <div
      className="animate-in fixed inset-0 z-50 
          max-h-screen animate-opacity-in overflow-hidden 
          opacity-0 backdrop-blur-sm"
    >
      <div
        className="bg-background  animate-in animate-in fixed left-[50%] 
          top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%]
          translate-y-[-50%] animate-opacity-in gap-4 border 
          border-border bg-base-light p-6 opacity-0 shadow-lg duration-200 
          sm:rounded-lg md:w-full"
      >
        <div className="flex justify-end">
          <X
            size={24}
            className="transition-color cursor-pointer duration-300 
            hover:text-primary-1000 hover:opacity-75"
            onClick={() => navigate(-1)}
          />
        </div>
        <>
          <div className="flex items-center gap-6">
            <ImageWithFallback
              url={participantProfile?.avatar_url ?? null}
              alt="profile avatar"
              className={cn('rounded-full')}
              size={64}
            />
            <p>{capitalize(participantProfile?.username)}</p>
          </div>
          <>
            {evaluation && (
              <p className="text-center text-xs text-light">
                {t('youHaveEvaluated')}{' '}
                <span className="font-semibold">
                  {capitalize(participantProfile?.username)}
                </span>{' '}
                {t('performanceAt')}{' '}
                <span className="font-semibold text-primary-1000">
                  {associateNumberToString(participantEvaluation.rating)}
                </span>{' '}
                {t('levelForThisEvent')}
              </p>
            )}
            {!evaluation && (
              <p className="text-center text-xs text-light">
                {t('youCanEvaluateSkillOf')}{' '}
                <span>{capitalize(participantProfile?.username)}</span>
                {t('moreAccurateAlgo')}
              </p>
            )}
            {!evaluation && (
              <Suspense fallback={<></>}>
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleEvaluationSubmission}
                >
                  {ALL_SKILLS.map((skill, index) => (
                    <GroupedStars
                      key={index}
                      legend={capitalize(skill)}
                      name={`${skill}-rating`}
                    />
                  ))}
                  <Button
                    type="submit"
                    variant="light"
                    textContent={t('event:sendEvaluation')}
                  />
                </form>
              </Suspense>
            )}
          </>
        </>
      </div>
    </div>
  );
}

export default ModalRouteRatingEvent;
