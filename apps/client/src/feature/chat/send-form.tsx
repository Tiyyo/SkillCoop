import { useRef, useState } from 'react';
import { socket } from './socket';
import { Send } from 'lucide-react';

type MyFormProps = {
  conversationId: number;
  userId: number;
  username: string;
  avatar: string | null;
};

export function MyForm({
  conversationId,
  userId,
  username,
  avatar,
}: MyFormProps) {
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    socket
      .timeout(5000)
      .emit(
        'message',
        { conversationId, userId, content: value, username, avatar },
        () => {
          setIsLoading(false);
        },
      );
    formRef.current?.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className="flex h-full w-full items-center gap-x-4 px-3 justify-center"
    >
      <input
        onChange={(e) => setValue(e.target.value)}
        className="bg-grey-off py-2 px-4 w-[80%] rounded-lg pl-1 
        placeholder:pl-2 placeholder:text-xs text-xs"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        disabled={isLoading}
        className=" flex
        h-9 w-9 items-center justify-center rounded-full text-opacity-80 shadow"
      >
        <Send size={20} className="text-primary-700" />
      </button>
    </form>
  );
}
