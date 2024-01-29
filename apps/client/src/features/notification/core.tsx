import capitalize from '../../utils/capitalize';
import { useMarkNotificationAsRead } from '../../hooks/useNotification';
import { useNotifications } from '../../stores/notification.store';
import { useTranslation } from 'react-i18next';
import ImageWithFallback from '../../components/image';

type CoreNotificationProps = {
  id: number;
  username?: string;
  children?: React.ReactNode;
  image?: string | null;
  message: string | JSX.Element;
  isRead: boolean;
  createdAt: string;
};

type ImageNotificationProps = {
  image?: string | null;
  username?: string | null;
};

function ImageNotification({ image, username }: ImageNotificationProps) {
  if (image) {
    return (
      <ImageWithFallback
        url={image}
        alt="avatar"
        className="rounded-full border-2 border-primary-300"
        size={32}
      />
    );
  }
  if (username) {
    return (
      <div
        className="border-1 flex aspect-square h-8 
    items-center justify-center rounded-full bg-slate-200 bg-opacity-50"
      >
        <p className="text-lg font-medium text-slate-600 text-opacity-50">
          {capitalize(username[0])}
        </p>
      </div>
    );
  }
}

// TODO : refactor this function into module
function createdSince(date: string) {
  const creationDateNotificationUTC = new Date(date);
  const localDate = new Date();
  const currentDateUTC = new Date(
    localDate.toLocaleString('en-US', { timeZone: 'Europe/London' }),
  );
  const diff = currentDateUTC.getTime() - creationDateNotificationUTC.getTime();
  const ONE_MINUTE = 60 * 1000;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_WEEK = 7 * ONE_DAY;
  const ONE_MONTH = 30 * ONE_DAY;

  if (diff < ONE_MINUTE) return 'just now';
  if (diff < ONE_HOUR) return `${Math.floor(diff / ONE_MINUTE)} min ago`;
  if (diff < ONE_DAY) return `${Math.floor(diff / ONE_HOUR)} h ago`;
  if (diff < 2 * ONE_DAY) return 'yesterday';
  if (diff > 2 * ONE_DAY && diff < ONE_WEEK)
    return `${Math.floor(diff / ONE_DAY)} d ago`;
  if (diff > ONE_WEEK && diff < 2 * ONE_MONTH)
    return `${Math.floor(diff / ONE_WEEK)} w ago`;
  if (diff > 2 * ONE_MONTH) return `${Math.floor(diff / ONE_MONTH)} month ago`;
}

function CoreNotification({
  id,
  children,
  image,
  message,
  username,
  isRead,
  createdAt,
}: CoreNotificationProps) {
  const { t } = useTranslation('notification');
  const getCreatedSinceTranslated = (str: string | undefined) => {
    if (!str) return;
    if (str === 'just now') return t('justNow');
    if (str === 'yesterday') return t('yesterday');
    const indicator = str.split(' ')[1];
    const number = str.split(' ')[0];
    if (indicator === 'min') return t('minutesAgo', { number });
    if (indicator === 'h') return t('hoursAgo', { number });
    if (indicator === 'd') return t('daysAgo', { number });
    if (indicator === 'w') return t('weeksAgo', { number });
    if (indicator === 'month') return t('monthsAgo', { number });
  };
  const { markAsReadInStore } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead({
    onSuccess: () => {
      markAsReadInStore(id);
    },
  });

  const handleClick = () => {
    markAsRead(id);
  };

  return (
    <div
      className="flex justify-between gap-x-3 px-1.5 py-3"
      onClick={handleClick}
    >
      <div className="w-10 flex-shrink-0">
        <ImageNotification image={image} username={username} />
      </div>
      <div
        className="justify-startflex-shrink flex w-full 
        flex-wrap gap-y-1.5 pt-2"
      >
        <p className="text-xs font-normal text-grey-sub-text lg:text-sm">
          {message}{' '}
          <span className="mx-2 text-xxs text-slate-400 lg:text-xs">
            {getCreatedSinceTranslated(createdSince(createdAt))}
          </span>
        </p>

        {!isRead && (
          <div className="flex w-full flex-col pb-1 pt-2.5 text-xs ">
            {children}
          </div>
        )}
      </div>
      <div className="flex flex-shrink-0 basis-14 py-2">
        {!isRead && (
          <div className="aspect-square h-2 rounded-full bg-error-mid"></div>
        )}
      </div>
    </div>
  );
}

export default CoreNotification;
