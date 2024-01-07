import { cn } from '../../lib/utils';
import { eventStatus } from 'skillcoop-types';
import { useTranslation } from 'react-i18next';

type BadgeProps = {
  content: string;
};

function Badge({ content }: BadgeProps) {
  const { t } = useTranslation('event');
  return (
    <div
      className={cn(
        `uppercase text-xxs font-semibold border
       border-primary-300 py-0.5 px-1.5 bg-primary-300 
         rounded-lg lg:text-xs lg:px-2.5 lg:py-1`,
        content === eventStatus.cancelled && 'bg-red-100 border-red-300',
      )}
    >
      {t(content)}
    </div>
  );
}

export default Badge;
