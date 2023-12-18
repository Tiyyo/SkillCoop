import { Dices } from 'lucide-react';
import { DropdownMenuItem } from '../../../../lib/ui/dropdown';
import { EventStatus } from 'skillcoop-types';
import { useGenerateTeams } from '../../../../hooks/useSingleEvent';

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
          <button onClick={handleClickGenerateTeams}>Generate teams</button>
        </DropdownMenuItem>
      )}
    </>
  );
}

export default GenerateTeamsMenuItem;
