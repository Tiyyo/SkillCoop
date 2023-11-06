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
    <div className="bg-base-light mx-2 my-4 rounded-md shadow py-2 px-3">
      <p className=" text-xs text-center font-semibold ">
        Election for Mvp and Best Striker are now avaible for this event
      </p>
      <Link
        to="votes"
        state={{ eventId, participants, profileId }}>
        <p className="text-xs text-end text-primary-1000 underline-offset-4 underline cursor-pointer">
          Go to vote page
        </p>
      </Link>
    </div>
  );
}

export default EventPageVotesBanner;
