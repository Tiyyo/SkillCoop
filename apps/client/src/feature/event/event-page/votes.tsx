import { Link } from 'react-router-dom';
import { EventParticipant } from '../../../types';
import Container from '../../../layout/container';
import { Info, MoveRight } from 'lucide-react';

type EventPageVotesBannerProps = {
  eventId: number;
  participants: EventParticipant[] | string;
  profileId?: number;
};

function EventPageVotesBanner({
  eventId,
  participants,
  profileId,
}: EventPageVotesBannerProps) {
  return (
    <Container className="w-full flex items-center gap-2 p-3.5">
      <Info size={24} className="text-primary-100 basis-7 flex-grow-0" />
      <p className=" text-xs lg:text-sm font-normal flex-grow">
        Elections for MVP and Best Striker are now available for this event.
      </p>
      <Link
        to="votes"
        className="flex items-center gap-1 flex-grow-0"
        state={{ eventId, participants, profileId }}
      >
        <p className="font-semibold text-primary-100 text-xs ">
          View Vote Page
        </p>
        <MoveRight size={16} className="text-primary-100" />
      </Link>
    </Container>
  );
}

export default EventPageVotesBanner;
