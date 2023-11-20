import { Link } from 'react-router-dom';
import { EventParticipant } from '../../../types';

interface EventPageVotesBannerProps {
  eventId: number;
  participants: EventParticipant[] | string;
  profileId?: number;
}

function EventPageVotesBanner({
  eventId,
  participants,
  profileId,
}: EventPageVotesBannerProps) {
  return (
    <div className="bg-base-light mx-2 rounded-md shadow py-2 px-3 lg:py-4 w-full ">
      <p className=" text-xs lg:text-md text-center font-semibold ">
        Elections for MVP and Best Striker are now available for this event.
      </p>
      <Link to="votes" state={{ eventId, participants, profileId }}>
        <p
          className="text-xs text-center py-2.5 text-primary-1000 
          underline-offset-4 underline cursor-pointer"
        >
          Go to vote page
        </p>
      </Link>
    </div>
  );
}

export default EventPageVotesBanner;
