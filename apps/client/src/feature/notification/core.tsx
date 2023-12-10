import { useMutation } from '@tanstack/react-query';
import defaultAvatar from '../../../public/images/default-avatar.png';
import capitalize from '../../utils/capitalize';
import { markNotficationAsReadFn } from '../../api/api.fn';
import { useMarkNotificationAsRead } from '../../hooks/useNotification';
import { useNotifications } from '../../store/notification.store';

interface CoreNotificationProps {
  id: number;
  username?: string;
  children?: React.ReactNode;
  image?: string | null;
  message: string | JSX.Element;
  isRead: boolean;
}

interface ImageNotificationProps {
  image?: string | null;
  username?: string | null;
}

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

function CoreNotification({
  id,
  children,
  image,
  message,
  username,
  isRead,
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
        <p className="text-xs font-normal text-grey-sub-text">{message}</p>
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
