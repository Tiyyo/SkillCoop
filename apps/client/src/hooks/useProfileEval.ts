// should return a boolean to indicate if the profile have skills
// should return the skill level of the profile
import { useEffect, useState } from 'react';
import { useGetProfileEval } from './useProfile';

export function useProfileEval({ profileId }: { profileId: number }) {
  const [hasBeenEvaluated, setHasBeenEvaluated] = useState<boolean>(false);
  const [averageEvaluation, setAverageEvaluation] = useState<
    Record<string, number>
  >({});

  const { data, isLoading } = useGetProfileEval({
    profileId,
  });

  useEffect(() => {
    if (!data) return;
    setHasBeenEvaluated(true);
    setAverageEvaluation((prev) => ({
      ...prev,
      defending: data.avg_defending,
      dribbling: data.avg_dribbling,
      passing: data.avg_passing,
      shooting: data.avg_shooting,
      pace: data.avg_pace,
    }));
  }, [isLoading]);

  return { hasBeenEvaluated, evaluateProfile: averageEvaluation };
}
