import { useId } from 'react';
import ImageWithUsernamefallback from '../../component/image-fallback-username';
import { cn } from '../../lib/utils';
import { Message } from '../../provisional-types';
import ChatBubble from './home-page/bubble';

type GroupAuthorMessageProps = {
  messages: Message[];
  userId: number;
  username: string;
  avatar: string | null;
  currentUserId: number;
};

function GroupAuthorMessage({
  messages,
  userId,
  username,
  avatar,
  currentUserId,
}: GroupAuthorMessageProps) {
  const hasBeenSentByCurrentUser = userId === currentUserId;
  const id = useId();

  return (
    <div className={cn('flex gap-x-1')}>
      {!hasBeenSentByCurrentUser && (
        <div className="w-7 flex-shrink-0 relative top-2">
          <ImageWithUsernamefallback avatar={avatar} username={username} />
        </div>
      )}
      <div
        className={cn(
          `flex flex-col w-full`,
          hasBeenSentByCurrentUser && 'items-end',
        )}
      >
        {!hasBeenSentByCurrentUser && (
          <p className="text-light text-xxs my-0.5">{username}</p>
        )}
        {messages &&
          messages.map((m, index) => (
            <div
              key={id + index.toString()}
              className={cn(
                'flex items-end',
                hasBeenSentByCurrentUser && 'flex-row-reverse',
              )}
            >
              <ChatBubble
                content={m.message}
                hasBeenSentByCurrentUser={hasBeenSentByCurrentUser}
              />
              <span
                className="text-light font-extralight text-xxs 
                py-0.5 px-1.5 text-opacity-20"
              >
                {new Date(m.created_at).toLocaleTimeString('fr-FR', {
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
