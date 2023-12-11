import { FolderInput } from 'lucide-react';
import UpdateStatusModal from '../../../../component/update-status-modal';
import { EventStatus } from '../../../../types';

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
