import { FolderInput } from 'lucide-react';
import UpdateStatusModal from '../../../../component/update-status-modal';
import type { EventStatus } from '@skillcoop/types';

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
  return (
    <>
      {eventStatus !== 'completed' && (
        <UpdateStatusModal eventId={eventId} profileId={profileId}>
          <FolderInput size="16" />
          <span>Revoke participation</span>
        </UpdateStatusModal>
      )}
    </>
  );
}

export default RevokeParticipationMenuItem;
