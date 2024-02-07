import type { EventParticipant } from '@skillcoop/types/src';
import ImageWithFallback from '../image';
import { useId } from 'react';

type AvatarsProps = {
  participants: EventParticipant[];
  nbAvatarToDisplay: number;
  plus?: number;
  team?: number;
  startSide?: 'left' | 'right';
};

function ResponsiveAvatar({
  avatar,
}: {
  profile_id: number;
  avatar: string | null;
}) {
  return (
    <>
      <ImageWithFallback
        url={avatar}
        alt="Participant avatar"
        size={28}
        className="aspect-square overflow-hidden
                rounded-full border-2 border-base-light bg-primary-800 
                md:hidden lg:border-3"
      />
      <ImageWithFallback
        url={avatar}
        alt="Participant avatar"
        size={36}
        className="hidden aspect-square overflow-hidden
                rounded-full border-2 border-base-light bg-primary-800 md:block
                lg:hidden lg:border-3"
      />
      <ImageWithFallback
        url={avatar}
        alt="Participant avatar"
        size={38}
        className="hidden aspect-square overflow-hidden
                rounded-full border-2 border-base-light bg-primary-800
                lg:block lg:border-3"
      />
    </>
  );
}

function Avatars({
  participants,
  nbAvatarToDisplay,
  team,
  startSide,
  plus,
}: AvatarsProps) {
  const idComp = useId();

  return (
    <div className={`h-fit ${startSide === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className=" flex -space-x-3">
        {participants
          .filter((participant) => {
            if (team) {
              return participant.team === team;
            }
            return true;
          })
          .slice(0, nbAvatarToDisplay)
          .map((participant) => (
            <ResponsiveAvatar
              key={idComp + participant.profile_id.toString()}
              profile_id={participant.profile_id}
              avatar={participant.avatar}
            />
          ))}
        {plus && plus > 0 ? (
          <div
            className=" flex aspect-square w-7 items-center justify-center 
            overflow-hidden rounded-full border-2 
          border-base-light bg-primary-100 md:w-9 lg:w-10 lg:border-3"
          >
            <span className="text-xxs text-base-light lg:font-semibold">
              {Number(plus) > 0 && `${plus}+`}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Avatars;
