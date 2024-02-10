import capitalize from '../../shared/utils/capitalize';
import AvatarRectangle from '../../shared/components/avatar-rectangle';
import { getAge } from '@skillcoop/date-handler/src';

type FriendProfileInfosProps = {
  avatar: string | null | undefined;
  firstname: string | null | undefined;
  lastname: string | null | undefined;
  age: string | null | undefined;
  location: string | null | undefined;
  username: string | null | undefined;
};

function FriendProfileInfos({
  avatar,
  firstname,
  lastname,
  age,
  location,
  username,
}: FriendProfileInfosProps) {
  return (
    <div
      className="relative  -top-12 z-10 
             flex flex-col pl-6"
    >
      <div className="flex flex-shrink-0 items-center gap-x-5">
        <AvatarRectangle avatar={avatar ?? null} />
      </div>
      <div className="flex justify-between ">
        <div>
          <h2 className="text-sm font-semibold">
            {capitalize(firstname)} {capitalize(lastname)}
          </h2>
          <p className="text-xs font-light">{username}</p>
          <div className="flex items-baseline gap-x-2 py-2">
            {age && (
              <span className="flex items-end text-xs">
                <img
                  src="/images/small-profile-green.png"
                  alt="Age icon"
                  className="h-5 w-5"
                />
                {getAge(age)}
              </span>
            )}
            {location && (
              <span className="flex items-end text-xs">
                <img
                  src="/images/location.png"
                  alt="location icon"
                  className="h-5 w-5"
                />
                {location}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendProfileInfos;
