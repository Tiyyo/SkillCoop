import { EventParticipant } from '../../types';

interface AvatarsProps {
  participants: EventParticipant[];
  nbAvatarToDisplay: number;
  team?: number;
  startSide?: 'left' | 'right';
}

function Avatars({
  participants,
  nbAvatarToDisplay,
  team,
  startSide,
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
              className="w-8 h-8 border-2 border-primary-1000 overflow-hidden rounded-full "
              src={
                participant.avatar
                  ? participant.avatar
                  : '/images/default-avatar.png'
              }
              alt="avatar participant"
            />
          ))}
      </div>
    </div>
  );
}

export default Avatars;
