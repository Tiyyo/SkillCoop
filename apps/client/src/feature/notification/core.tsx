import capitalize from '../../utils/capitalize';
import { useMarkNotificationAsRead } from '../../hooks/useNotification';
import { useNotifications } from '../../store/notification.store';

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
      <img
        src={image}
        alt="avatar"
        className="h-8 aspect-square rounded-full border-2 border-primary-300"
      />
    );
  }
  if (username) {
    return (
      <div
        className="h-8 aspect-square rounded-full border-1 
    flex items-center justify-center bg-slate-200 bg-opacity-50"
      >
        <p className="text-lg font-medium text-slate-600 text-opacity-50">
          {capitalize(username[0])}
        </p>
      </div>
    );
  }
}

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
  if (diff < ONE_DAY) return `${Math.floor(diff / ONE_HOUR)}h ago`;
  if (diff < 2 * ONE_DAY) return 'yesterday';
  if (diff > 2 * ONE_DAY && diff < ONE_WEEK)
    return `${Math.floor(diff / ONE_DAY)}d ago`;
  if (diff > ONE_WEEK && diff < 2 * ONE_MONTH)
    return `${Math.floor(diff / ONE_WEEK)}w ago`;
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
      className="flex gap-x-3 justify-between py-3 px-1.5"
      onClick={handleClick}
    >
      <div className="flex-shrink-0 w-10">
        <ImageNotification image={image} username={username} />
      </div>
      <div className="flex gap-y-1.5 justify-startflex-shrink flex-wrap w-full pt-2">
        <p className="text-xs lg:text-sm font-normal text-grey-sub-text">
          {message}{' '}
          <span className="text-xxs lg:text-xs mx-2 text-slate-400">
            {createdSince(createdAt)}
          </span>
        </p>

        {!isRead && (
          <div className="flex flex-col w-full text-xs pt-2.5 pb-1 ">
            {children}
          </div>
        )}
      </div>
      <div className="flex py-2 basis-14 flex-shrink-0">
        {!isRead && (
          <div className="h-2 aspect-square rounded-full bg-error-mid"></div>
        )}
      </div>
    </div>
  );
}

export default CoreNotification;
