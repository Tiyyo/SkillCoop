import { useId } from 'react';
/*eslint-disable*/
import ImageWithUsernamefallback from '../../../../components/image-fallback-username';
/*eslint-enable*/
import { cn } from '../../../../lib/utils';
import ChatBubble from './bubble';
import { Message } from 'packages/types/src';
import { getCurrentLngInLocalStorage } from '../../../../utils/get-current-lng';

type GroupAuthorMessageProps = {
  messages: Message[];
  userId: number;
  username: string;
  avatar: string | null;
  currentUserId: number | null;
};

function GroupAuthorMessage({
  messages,
  userId,
  username,
  avatar,
  currentUserId,
}: GroupAuthorMessageProps) {
  const currentLng = getCurrentLngInLocalStorage();
  const hasBeenSentByCurrentUser = userId === currentUserId;
  const id = useId();

  return (
    <div className={cn('flex gap-x-1')}>
      {!hasBeenSentByCurrentUser && (
        <div className="relative top-2 w-7 flex-shrink-0">
          <ImageWithUsernamefallback
            avatar={avatar}
            username={username}
            size={30}
          />
        </div>
      )}
      <div
        className={cn(
          `flex w-full flex-col`,
          hasBeenSentByCurrentUser && 'items-end',
        )}
      >
        {!hasBeenSentByCurrentUser && (
          <p className="my-0.5 text-xxs text-light">{username}</p>
        )}
        {messages &&
          messages.map((m, index) => (
            <div
              key={id + index.toString()}
              className={cn(
                'flex w-full items-end',
                hasBeenSentByCurrentUser && 'flex-row-reverse',
              )}
            >
              <ChatBubble
                content={m.message}
                hasBeenSentByCurrentUser={hasBeenSentByCurrentUser}
              />
              <span
                className="px-1.5 py-0.5 text-xxs 
                font-extralight text-light text-opacity-20"
              >
                {new Date(m.created_at).toLocaleTimeString(`${currentLng}-US`, {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                })}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default GroupAuthorMessage;
