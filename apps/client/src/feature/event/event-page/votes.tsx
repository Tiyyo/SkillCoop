import { Link } from 'react-router-dom';
import type { EventParticipant } from '@skillcoop/types';
import Container from '../../../layout/container';
import { Info, MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('event');
  return (
    <Container className="w-full flex items-center gap-2 p-3.5">
      <Info size={24} className="text-primary-100 basis-7 flex-grow-0" />
      <p className=" text-xs lg:text-sm font-normal flex-grow">
        {t('electionsFor')}
      </p>
      <Link
        to="votes"
        className="flex items-center gap-1 flex-grow-0"
        state={{ eventId, participants, profileId }}
      >
        <p className="font-semibold text-primary-100 text-xs ">
          {t('viewVotePage')}
        </p>
        <MoveRight size={16} className="text-primary-100" />
      </Link>
    </Container>
  );
}

export default EventPageVotesBanner;
