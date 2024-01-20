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
        `text-xs font-normal text-gray-900  
          max-w-[80%] leading-1.5 py-1.5 px-3 
         my-0.5 rounded-xl `,
        hasBeenSentByCurrentUser
          ? 'text-end first:rounded-tr-none bg-primary-300 '
          : 'text-start nth-child-2:rounded-tl-none bg-gray-100',
      )}
    >
      {content}
    </p>
  );
}

export default ChatBubble;
