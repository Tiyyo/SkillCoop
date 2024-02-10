import { Dices } from 'lucide-react';
import { DropdownMenuItem } from '../../../../lib/ui/dropdown';
import { EventStatus } from '@skillcoop/types/src';
import { useGenerateTeams } from '../../../../shared/hooks/useSingleEvent';
import { useTranslation } from 'react-i18next';

type GenerateTeamsMenuItemProps = {
  isAdmin: boolean;
  eventId?: number;
  eventStatus?: EventStatus | null;
};
const menuItemStyle = `flex gap-2 items-center hover:bg-primary-200 
    transition-colors duration-300 rounded-lg px-2 text-md h-10`;

function GenerateTeamsMenuItem({
  isAdmin,
  eventId,
  eventStatus,
}: GenerateTeamsMenuItemProps) {
  const { t } = useTranslation('event');
  const { mutate: generateTeams } = useGenerateTeams({
    eventId,
    onSuccess: () => window.location.reload(),
  });

  const handleClickGenerateTeams = () => {
    if (!eventId) return;
    generateTeams(eventId);
  };
  if (!isAdmin) return null;
  return (
    <>
      {eventStatus === 'full' && (
        <DropdownMenuItem className={menuItemStyle}>
          <Dices size="16" />
          <button onClick={handleClickGenerateTeams}>
            {t('generateTeams')}
          </button>
        </DropdownMenuItem>
      )}
    </>
  );
}

export default GenerateTeamsMenuItem;
