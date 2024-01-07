import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

function WelcomeMessage({
  username,
  className,
}: {
  username?: string;
  className?: string;
}) {
  const { t } = useTranslation('system');
  return (
    <div className={cn(className)}>
      <p className="font-light">{t('welcomeBack')} !</p>
      <p className="font-semibold">
        <span>{username}</span>
      </p>
    </div>
  );
}

export default WelcomeMessage;
