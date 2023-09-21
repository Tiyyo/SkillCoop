import { EventParticipant } from "../../types";

interface AvatarsProps {
  participants: EventParticipant[];
  nbAvatarToDisplay: number;
  team?: number;
  startSide?: "left" | "right";
}

function Avatars({
  participants,
  nbAvatarToDisplay,
  team,
  startSide,
}: AvatarsProps) {
  const ARBITRARY_STARTING_Z_INDEX = 100;
  const ARBITRARY_SCALE_Z_INDEX = 10;

  return (
    <div
      className={`relative flex ${
        startSide === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {participants
        .filter((participant) => {
          if (team) {
            return participant.team === team;
          }
          return true;
        })
        .slice(0, nbAvatarToDisplay)
        .map((participant, index) => (
          <div
            key={participant.profile_id}
            className="relative rounded-full border-2 border-primary-1100 aspect-square h-8 overflow-hidden"
            style={{
              zIndex:
                ARBITRARY_STARTING_Z_INDEX - index * ARBITRARY_SCALE_Z_INDEX,
              transform: `translateX(${
                startSide === "right" ? index : -index
              }rem)`,
            }}
          >
            <img
              src={
                participant.avatar
                  ? participant.avatar
                  : "/images/default-avatar.png"
              }
            />
          </div>
        ))}
    </div>
  );
}

export default Avatars;
