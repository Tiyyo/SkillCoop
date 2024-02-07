import { cn } from '../../../../lib/utils';

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
        `leading-1.5 my-0.5 w-fit max-w-[240px]  
          break-words rounded-xl px-3 py-1.5 
         text-xs font-normal text-text-base lg:max-w-[70%]`,
        hasBeenSentByCurrentUser
          ? 'bg-primary-500 text-end first:rounded-tr-none '
          : 'bg-bubble text-start nth-child-2:rounded-tl-none',
      )}
    >
      {content}
    </p>
  );
}

export default ChatBubble;
