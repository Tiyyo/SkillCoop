import { cn } from '../../../lib/utils';

function ChatBubble({
  content,
  hasBeenSentByCurrentUser,
}: {
  content: string;
  hasBeenSentByCurrentUser: boolean;
}) {
  return (
    <p
      className={cn(
        `leading-1.5 my-0.5 max-w-[80%]  
          rounded-xl px-3 py-1.5 text-xs 
         font-normal text-gray-900 `,
        hasBeenSentByCurrentUser
          ? 'bg-primary-300 text-end first:rounded-tr-none '
          : 'bg-gray-100 text-start nth-child-2:rounded-tl-none',
      )}
    >
      {content}
    </p>
  );
}

export default ChatBubble;