import { Link } from 'react-router-dom';
import Avatars from '../../../components/avatars';
import Badge from '../../../components/badge';
import Score from '../../../components/score';
import type { EventParticipant, EventStatus } from '@skillcoop/types/src';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type EventCardProps = {
  date: string;
  location: string;
  duration: number;
  participants: EventParticipant[];
  scoreTeamA?: number | null;
  scoreTeamB?: number | null;
  eventId: number;
};

function SharedEventCard({
  date,
  location,
  duration,
  scoreTeamA,
  scoreTeamB,
  participants,
  eventId,
}: EventCardProps) {
  const { t } = useTranslation('event');

  return (
    <div
      className="mt-2 flex h-fit w-full flex-col border-t 
    border-t-primary-20 bg-base-light py-2"
    >
      <div className="flex justify-end py-2">
        <Badge content="completed" />
      </div>
      <div className="flex">
        <div className="flex basis-2/12 items-center gap-x-3">
          <div className="flex-shrink-0">
            <div className="text-xs">{t('team')}</div>
            <Avatars
              participants={participants}
              team={1}
              nbAvatarToDisplay={3}
              plus={participants.length / 2 - 3}
              startSide="left"
            />
          </div>
        </div>

        <Score
          eventStatus="completed"
          scoreTeamA={scoreTeamA}
          scoreTeamB={scoreTeamB}
          date={date}
          duration={duration}
          location={location}
        />

        <div
          className="flex basis-2/12 flex-row-reverse 
            items-center gap-x-3"
        >
          <div className="flex-shrink-0">
            <div className="text-xs">{t('team')}</div>
            <Avatars
              participants={participants}
              team={2}
              nbAvatarToDisplay={3}
              plus={participants.length / 2 - 3}
              startSide="right"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2">
        <Link
          to={`/event/${eventId}`}
          state={{ eventId }}
          className="flex flex-grow flex-row-reverse items-end 
          text-xxs text-dark transition-colors duration-300 
          hover:text-primary-100 lg:text-sm"
        >
          <span className="flex items-center gap-x-0.5">
            {t('details')}
            <ArrowRight size={14} className="selt-center" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SharedEventCard;
