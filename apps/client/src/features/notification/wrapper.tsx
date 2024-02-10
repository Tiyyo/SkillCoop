import capitalize from '../../shared/utils/capitalize';
import { useTranslation } from 'react-i18next';
import ImageWithFallback from '../../shared/components/image';
import useMarkAsRead from './hooks/useMarkAsRead';
import { createdSince } from './utils/created-since';

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

  const { handleClick } = useMarkAsRead({ id });

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
