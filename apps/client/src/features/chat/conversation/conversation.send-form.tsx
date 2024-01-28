import { useRef, useState } from 'react';
import { socket } from '../socket';
import { Send } from 'lucide-react';

type MyFormProps = {
  conversationId: number;
  userId: number | null;
  username: string | undefined;
  avatar: string | null | undefined;
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

    socket.timeout(5000).emit(
      'message',
      {
        conversation_id: conversationId,
        user_id: userId,
        message: value,
        username,
        avatar,
      },
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
      className="flex h-full w-full items-center justify-center gap-x-4 px-3"
    >
      <textarea
        onChange={(e) => setValue(e.target.value)}
        className="h-fit w-[80%] max-w-[240px] rounded-lg bg-grey-off px-4 py-2 
        pl-1 text-xs placeholder:pl-2 placeholder:text-xs lg:max-w-[400px]"
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
