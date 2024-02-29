import type { EventParticipant } from '@skillcoop/types/src';
import ImageWithFallback from '../image';
import { useId } from 'react';
import { cn } from '../../../lib/utils';

type AvatarsProps = {
  participants: EventParticipant[];
  nbAvatarToDisplay: number;
  plus?: number;
  team?: number;
  startSide?: 'left' | 'right';
  borderNone?: boolean;
};

function ResponsiveAvatar({
  avatar,
  borderNone,
}: {
  avatar: string | null;
  borderNone?: boolean;
}) {
  return (
    <>
      <ImageWithFallback
        url={avatar}
        alt="Participant avatar"
        size={28}
        className={cn(
          `"aspect-square lg:border-3"
                overflow-hidden rounded-full border-2 border-base-light
                bg-primary-800 md:hidden`,
          borderNone && 'border border-transparent',
        )}
      />
      <ImageWithFallback
        url={avatar}
        alt="Participant avatar"
        size={36}
        className={cn(
          `lg:border-3" hidden aspect-square overflow-hidden 
        rounded-full border-2 border-base-light bg-primary-800
        md:block lg:hidden`,
          borderNone && 'border border-transparent',
        )}
      />
      <ImageWithFallback
        url={avatar}
        alt="Participant avatar"
        size={38}
        className={cn(
          `hidden aspect-square 
                overflow-hidden rounded-full border-2 border-base-light
                bg-primary-800 lg:block lg:border-3`,
          borderNone && 'border border-transparent',
        )}
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
  borderNone,
}: AvatarsProps) {
  const idComp = useId();
  return (
    <div className={`h-fit ${startSide === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className={cn('flex', nbAvatarToDisplay > 1 && '-space-x-3')}>
        {participants &&
          participants
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
                avatar={participant.avatar}
                borderNone={borderNone}
              />
            ))}
        {plus && plus > 0 ? (
          <div
            className={cn(
              `flex aspect-square w-7 items-center justify-center 
            overflow-hidden rounded-full border-2 
          border-base-light bg-primary-100 md:w-9 lg:w-10 lg:border-3`,
              borderNone && 'border-none lg:border-none',
            )}
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
