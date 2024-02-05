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
      <p className="flex items-center font-semibold">
        <span>{username}</span>
        <img
          src="/images/hi-icon.png"
          alt="Welcome hand"
          className="ml-2 inline-block h-5 w-5"
        />
      </p>
    </div>
  );
}

export default WelcomeMessage;
