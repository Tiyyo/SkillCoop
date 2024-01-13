import { X } from 'lucide-react';
import Button from '../../../component/button';
import GroupedStars from '../../../component/star-rating';
import { Suspense } from 'react';
import capitalize from '../../../utils/capitalize';
/* eslint-disable-next-line */
import associateNumberToString from '../../../utils/associate-number-stringscale';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import ImageWithFallback from '../../../component/image/index';
import { ALL_SKILLS } from '../../../constant/skill-constant';
import usePostMatchEvaluation from '../../../hooks/usePostMatchEvaluation';

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
      className="fixed max-h-screen overflow-hidden inset-0 z-50 
          bg-background/80 backdrop-blur-sm opacity-0 
          animate-in animate-opacity-in"
    >
      <div
        className="bg-base-light  fixed left-[50%] top-[50%] z-50 
          grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] 
          gap-4 border bg-background p-6 shadow-lg duration-200 
          animate-in sm:rounded-lg md:w-full opacity-0 
          animate-in animate-opacity-in"
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
          <div className="flex gap-6 items-center">
            <ImageWithFallback
              url={participantProfile?.avatar_url ?? null}
              alt="profile avatar"
              className={cn('w-16 h-16 rounded-full')}
            />
            <p>{capitalize(participantProfile?.username)}</p>
          </div>
          <>
            {evaluation && (
              <p className="text-xs text-light text-center">
                {t('youHaveEvaluated')}{' '}
                <span className="font-semibold">
                  {capitalize(participantProfile?.username)}
                </span>{' '}
                {t('performanceAt')}{' '}
                <span className="text-primary-1000 font-semibold">
                  {associateNumberToString(participantEvaluation.rating)}
                </span>{' '}
                {t('levelForThisEvent')}
              </p>
            )}
            {!evaluation && (
              <p className="text-xs text-light text-center">
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
