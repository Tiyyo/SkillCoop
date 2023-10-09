import { useEffect, useState } from 'react';
import RadarChart from '../../component/radar-chart';
import associateNumberToString from '../../utils/associate-number-stringscale';
import capitalize from '../../utils/capitalize';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfileFn } from '../../api/api.fn';
import ReturnBtn from '../../component/return';

function FriendProfile() {
  const [hasSkills, setHasSkills] = useState<boolean>(false);
  const [skillValues, setSkillValues] = useState<Record<string, number | null>>(
    {}
  );
  const params = useParams<{ id: string }>();
  const profileId = Number(params.id);
  const {
    data: profile,
    isSuccess,
    isLoading,
  } = useQuery(['profile', profileId], () => {
    if (!profileId) return;
    return getProfileFn(profileId);
  });

  const values = Object.values(skillValues);
  const maxValue = Math.max(...values);

  const getAgeFromDate = (date: string) => {
    const birthday = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthday.getFullYear();
    return `${age} years old`;
  };

  useEffect(() => {
    if (!profile) return;
    setHasSkills(true);
    setSkillValues((prev) => ({
      ...prev,
      defending: profile.avg_defending,
      dribbling: profile.avg_dribbling,
      passing: profile.avg_passing,
      shooting: profile.avg_shooting,
      pace: profile.avg_pace,
    }));
  }, [isLoading]);

  return (
    <div>
      <ReturnBtn />
      <h2 className="text-lg font-semibold">{profile?.username}</h2>{' '}
      {/* <p>{profile.location}</p> */}
      <p>{getAgeFromDate(profile?.date_of_birth)}</p>
      {hasSkills && (
        <>
          <div className="text-xs text-light px-4">
            <p>
              <span>{profile.username}</span> have participed to{' '}
              <span className="font-semibold">0</span> event
            </p>
            <p>
              <span>{profile.username}</span> received{' '}
              <span className="font-semibold">1</span> rating or bonus
            </p>

            <p>
              Here is <span>{profile.username}</span> average skills:{' '}
              <span className="font-semibold">
                {capitalize(associateNumberToString(profile?.gb_rating ?? 0))}
              </span>
            </p>
          </div>
          <RadarChart
            skills={skillValues}
            min={0}
            max={maxValue + 10}
            displayTicks={false}
          />
        </>
      )}
    </div>
  );
}

export default FriendProfile;
