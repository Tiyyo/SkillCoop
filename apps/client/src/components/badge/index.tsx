import { cn } from '../../lib/utils';
import { eventStatus } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';
type BadgeProps = {
  content: string;
};

function Badge({ content }: BadgeProps) {
  const { t } = useTranslation('event');
  return (
    <div
      className={cn(
        `rounded-lg border border-primary-300 bg-primary-300
       px-1.5 py-0.5 text-xxs font-semibold 
         uppercase  lg:px-2.5 lg:py-1 lg:text-xs`,
        content === eventStatus.cancelled &&
          'border-error-mid border-opacity-50',
      )}
    >
      {t(content)}
    </div>
  );
}

export default Badge;
