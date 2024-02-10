import { FolderInput } from 'lucide-react';
import UpdateStatusModal from '../../../shared/components/update-status-modal';
import type { EventStatus } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

type RevokeParticipationMenuItemProps = {
  eventStatus: EventStatus | null;
  eventId?: number;
  profileId?: number;
};

function RevokeParticipationMenuItem({
  eventStatus,
  eventId,
  profileId,
}: RevokeParticipationMenuItemProps) {
  const { t } = useTranslation('event');
  return (
    <>
      {eventStatus !== 'completed' && (
        <UpdateStatusModal eventId={eventId} profileId={profileId}>
          <FolderInput size="16" />
          <span>{t('revokeParticipation')}</span>
        </UpdateStatusModal>
      )}
    </>
  );
}

export default RevokeParticipationMenuItem;
