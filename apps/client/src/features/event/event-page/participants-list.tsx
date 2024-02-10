import Participant from '../../../components/participant';
import TitleH2 from '../../../components/title-h2';
import Container from '../../../shared/layouts/container';
import { useEvent } from '../../event-page/store/event.store';
import type { EventParticipant } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

type ParticipantsListProps = {
  confirmedParticipants?: number | null;
  requiredparticipants: number | null;
  participants?: EventParticipant[] | string | null;
};

function ParticipantsList({
  confirmedParticipants,
  requiredparticipants,
  participants,
}: ParticipantsListProps) {
  const { t } = useTranslation('system');
  const eventParticipantsStatus = () => {
    return (
      `${confirmedParticipants} / ${requiredparticipants}` +
      ' ' +
      t('areConfirmed')
    );
  };

  const { data: eventStore } = useEvent();

  return (
    <Container className="w-full">
      <TitleH2
        title={t('event:participants')}
        legend={eventParticipantsStatus()}
      />
      <ul className="flex flex-wrap justify-center gap-2">
        {/* particpants can be a string if backend failed to parsed data */}
        {participants &&
          typeof participants !== 'string' &&
          participants.map((participant) => (
            <Participant
              isAdmin={eventStore?.organizer_id === participant.profile_id}
              profileId={participant.profile_id}
              eventStatus={eventStore.status_name}
              key={participant.profile_id}
              {...participant}
            />
          ))}
      </ul>
    </Container>
  );
}

export default ParticipantsList;
