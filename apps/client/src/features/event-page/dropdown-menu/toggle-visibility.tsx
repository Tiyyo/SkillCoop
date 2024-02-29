import { EventStatus } from '@skillcoop/types/src';
/*eslint-disable max-len */
import UpdateVisibilityEventModal from '../../../shared/components/update-visibility-modal';
/*eslint-enable max-len*/
import { LockKeyhole, UnlockKeyhole } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ToggleEventVisibilityProps = {
  eventStatus?: EventStatus | null;
  eventId?: number;
  profileId?: string;
  visibility: 'public' | 'private' | null;
  isAdmin?: boolean;
};

function ToggleEventVisibility({
  eventId,
  profileId,
  isAdmin,
  visibility,
}: ToggleEventVisibilityProps) {
  if (!visibility || !isAdmin) return null;
  const { t } = useTranslation('event');
  function getRightLockIcon(size: number) {
    return visibility === 'public' ? (
      <UnlockKeyhole size={size} />
    ) : (
      <LockKeyhole size={size} />
    );
  }

  return (
    <UpdateVisibilityEventModal
      eventId={eventId}
      profileId={profileId}
      visibility={visibility}
    >
      {getRightLockIcon(16)}
      <span>
        {visibility === 'public' ? (
          <>{t('makeItPrivate')}</>
        ) : (
          <>{t('makeItPublic')}</>
        )}
      </span>
    </UpdateVisibilityEventModal>
  );
}

export default ToggleEventVisibility;
