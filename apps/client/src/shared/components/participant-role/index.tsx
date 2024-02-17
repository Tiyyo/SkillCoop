import { InvitationStatus } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

type ParticipantRole = {
  isAdmin: boolean | undefined;
  participantStatus: InvitationStatus;
};

function ParticipantRole({ isAdmin, participantStatus }: ParticipantRole) {
  const { t } = useTranslation('event');
  if (isAdmin) return <span>{t('organizer')}</span>;
  if (participantStatus === 'confirmed') return <span>{t('member')}</span>;
  if (participantStatus === 'pending') return <span>{t('invited')}</span>;
  if (participantStatus === 'requested') return <span>{t('applicant')}</span>;
  return null;
}

export default ParticipantRole;
