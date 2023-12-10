import Container from '../../layout/container';
import associateNumberToString from '../../utils/associate-number-stringscale';
import capitalize from '../../utils/capitalize';
import { sumValues } from '../../utils/sum-values';

type ProfileSkillsResumeProps = {
  username: string;
  nbAtentedEvents: number | undefined;
  nbMvpBonus: number | undefined;
  nbReview: number | undefined;
  nbBestStrikerBonus: number | undefined;
  lastEvaluation: number | undefined;
};

export default function ProfileSkillsResume({
  username,
  nbAtentedEvents,
  nbMvpBonus,
  nbReview,
  nbBestStrikerBonus,
  lastEvaluation,
}: ProfileSkillsResumeProps) {
  return (
    <Container>
      <div className="flex flex-col gap-y-0.5 text-xs text-light px-4">
        <p>
          <span>{capitalize(username)}</span> have participed to{' '}
          <span className="font-semibold">{nbAtentedEvents ?? 0}</span> event
        </p>
        <p>
          <span>{capitalize(username)}</span> received{' '}
          <span className="font-semibold">
            {sumValues(nbMvpBonus, nbReview, nbBestStrikerBonus)}
          </span>{' '}
          rating or bonus
        </p>

        <p>
          Here is <span>{username}</span> average skills:{' '}
          <span className="font-semibold">
            {capitalize(associateNumberToString(lastEvaluation ?? 0))}
          </span>
        </p>
      </div>
    </Container>
  );
}
