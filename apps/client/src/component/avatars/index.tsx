import { EventParticipant } from '../../types';

interface AvatarsProps {
  participants: EventParticipant[];
  nbAvatarToDisplay: number;
  plus?: number;
  team?: number;
  startSide?: 'left' | 'right';
}

function Avatars({
  participants,
  nbAvatarToDisplay,
  team,
  startSide,
  plus,
}: AvatarsProps) {
  return (
    <div className={`h-fit ${startSide === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="flex mb-5 -space-x-3">
        {participants
          .filter((participant) => {
            if (team) {
              return participant.team === team;
            }
            return true;
          })
          .slice(0, nbAvatarToDisplay)
          .map((participant) => (
            <img
              key={participant.profile_id}
              className="w-7 md:w-9 lg:w-10
              aspect-square border-2 lg:border-3 border-base-light overflow-hidden rounded-full"
              src={
                participant.avatar
                  ? participant.avatar
                  : '/images/default-avatar.png'
              }
              alt="avatar participant"
            />
          ))}
        {plus && plus > 0 ? (
          <div
            className=" flex justify-center items-center w-7 md:w-9 lg:w-10
          aspect-square bg-primary-100 
          border-2 lg:border-3 border-base-light overflow-hidden rounded-full"
          >
            <span className="text-base-light text-xxs lg:font-semibold">
              {Number(plus) > 0 && `${plus}+`}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Avatars;
