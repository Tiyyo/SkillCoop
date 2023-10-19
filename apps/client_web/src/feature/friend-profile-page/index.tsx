import { useEffect, useState } from 'react';
import RadarChart from '../../component/radar-chart';
import associateNumberToString from '../../utils/associate-number-stringscale';
import capitalize from '../../utils/capitalize';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfileEvalFn, getProfileFn } from '../../api/api.fn';
import ReturnBtn from '../../component/return';
import dateHandler from '../../utils/date.handler';
import Container from '../../layout/container';

function FriendProfile() {
  const [hasSkills, setHasSkills] = useState<boolean>(false);
  const [skillValues, setSkillValues] = useState<Record<string, number>>({});
  const params = useParams<{ id: string }>();
  const profileId = Number(params.id);
  const { data: profile } = useQuery(['profile', profileId], () => {
    if (!profileId) return;
    return getProfileFn(profileId);
  });

  const { data: skills, isLoading: isLoadingSkills } = useQuery(
    [`skills${profileId}`],
    () => {
      if (!profileId) return;
      return getProfileEvalFn(profileId);
    }
  );

  const values = Object.values(skillValues);
  const getMaxValue = (values: any) => {
    if (!values) return;
    return Math.max(...values);
  };
  const maxValue = getMaxValue(values);

  useEffect(() => {
    if (!skills) return;
    setHasSkills(true);
    setSkillValues((prev) => ({
      ...prev,
      defending: skills.avg_defending,
      dribbling: skills.avg_dribbling,
      passing: skills.avg_passing,
      shooting: skills.avg_shooting,
      pace: skills.avg_pace,
    }));
  }, [isLoadingSkills]);

  return (
    //TODO : refactor this component
    <div>
      <ReturnBtn />
      <h2 className="text-lg font-semibold px-3 py-2">Infos</h2>
      <Container>
        <div className="flex items-start gap-4">
          <img
            src={
              profile?.avatar_url
                ? profile.avatar_url
                : '/images/default-avatar.png'
            }
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col justify-between py-1 w-full">
            <dl className="-my-3 divide-y divide-gray-100 text-sm ">
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-2 border-none">
                <dt className=" text-primary-1100 font-semibold">Username</dt>
                <dd className="flex items-center text-light sm:col-span-2 border-t-primary-300 border-t h-12 my-auto ml-1 p-1">
                  {capitalize(profile?.username)}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-2 border-none">
                <dt className=" text-primary-1100 font-semibold">Firstname</dt>
                <dd className="flex items-center text-light sm:col-span-2 border-t-primary-300 border-t h-12 my-auto ml-1 p-1">
                  {capitalize(profile?.first_name)}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-2 border-none">
                <dt className=" text-primary-1100 font-semibold">Lastname</dt>
                <dd className="flex items-center text-light sm:col-span-2 border-t-primary-300 border-t h-12 my-auto ml-1 p-1">
                  {capitalize(profile?.last_name)}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-2 border-none">
                <dt className=" text-primary-1100 font-semibold">Age</dt>
                <dd className="flex items-center text-light sm:col-span-2 border-t-primary-300 border-t h-12 my-auto ml-1 p-1">
                  {dateHandler.getAgeFromDate(profile?.date_of_birth)}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-2 border-none">
                <dt className=" text-primary-1100 font-semibold">Location</dt>
                <dd className="flex items-center text-light sm:col-span-2 border-t-primary-300 border-t h-12 my-auto ml-1 p-1">
                  {capitalize(profile?.location)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
      {hasSkills && (
        <>
          <h2 className="text-lg font-semibold px-3 py-2">Skills</h2>
          <Container>
            <div className="flex flex-col gap-y-0.5 text-xs text-light px-4">
              <p>
                <span>{capitalize(profile?.username)}</span> have participed to{' '}
                <span className="font-semibold">0</span> event
              </p>
              <p>
                <span>{capitalize(profile?.username)}</span> received{' '}
                <span className="font-semibold">1</span> rating or bonus
              </p>

              <p>
                Here is <span>{profile?.username}</span> average skills:{' '}
                <span className="font-semibold">
                  {capitalize(associateNumberToString(profile?.gb_rating ?? 0))}
                </span>
              </p>
            </div>
          </Container>
          <Container>
            <RadarChart
              skills={skillValues}
              min={0}
              max={maxValue ? maxValue + 10 : 100}
              displayTicks={false}
            />
          </Container>
        </>
      )}
    </div>
  );
}

export default FriendProfile;
