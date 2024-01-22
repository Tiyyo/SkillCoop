import { Link } from 'react-router-dom';
import type { EventParticipant } from '@skillcoop/types/src';
import Container from '../../../layouts/container';
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
    <Container className="flex w-full items-center gap-2 p-3.5">
      <Info size={24} className="flex-grow-0 basis-7 text-primary-100" />
      <p className=" flex-grow text-xs font-normal lg:text-sm">
        {t('electionsFor')}
      </p>
      <Link
        to="votes"
        className="flex flex-grow-0 items-center gap-1"
        state={{ eventId, participants, profileId }}
      >
        <p className="text-xs font-semibold text-primary-100 ">
          {t('viewVotePage')}
        </p>
        <MoveRight size={16} className="text-primary-100" />
      </Link>
    </Container>
  );
}

export default EventPageVotesBanner;
