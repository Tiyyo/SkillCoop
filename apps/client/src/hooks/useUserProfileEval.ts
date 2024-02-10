import { useEffect, useState } from 'react';
import { useAutoEvaluateSkill, useGetProfileEval } from '../shared/hooks/useProfile';
import type { Skills } from '@skillcoop/types/src';

export function useUserProfileEval({
  profileId,
  onSuccess,
  onError,
}: {
  profileId?: number;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const [hasBeenEvaluated, setHasBeenEvaluated] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skills | null>(null);
  const {
    data: profileEval,
    isLoading,
    isFetching,
  } = useGetProfileEval({
    profileId,
  });
  const { mutate: autoEvaluate, isLoading: isMutationLoad } =
    useAutoEvaluateSkill({ profileId, onSuccess, onError });
  const loading = isLoading || isFetching || isMutationLoad;

  useEffect(() => {
    //@ts-ignore
    if (profileEval && profileEval.error) {
      setHasBeenEvaluated(false);
    }
    if (profileEval && profileEval.gb_rating) {
      setSkills({
        defending: profileEval.avg_defending,
        dribbling: profileEval.avg_dribbling,
        passing: profileEval.avg_passing,
        shooting: profileEval.avg_shooting,
        pace: profileEval.avg_pace,
      });
      setHasBeenEvaluated(true);
    }
  }, [loading]);

  return {
    hasBeenEvaluated,
    autoEvaluate,
    skills,
    gbRating: (profileEval && profileEval.gb_rating) ?? null,
    loading,
  };
}
