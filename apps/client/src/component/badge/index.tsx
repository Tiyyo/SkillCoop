import { cn } from '../../lib/utils';
import { eventStatus } from '../../types//index';

type BadgeProps = {
  content: string;
};

function Badge({ content }: BadgeProps) {
  return (
    <div
      className={cn(
        `uppercase text-xxs font-semibold border
     border-primary-300 py-0.5 px-1.5 bg-primary-300 rounded-lg lg:text-xs lg:px-2.5 lg:py-1`,
        content === eventStatus.cancelled && 'bg-red-100 border-red-300',
      )}
    >
      {content}
    </div>
  );
}

export default Badge;
