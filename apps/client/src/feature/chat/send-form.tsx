import { useRef, useState } from 'react';
import { socket } from './socket';

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
      className="flex h-full w-full items-center gap-x-2"
    >
      <input
        onChange={(e) => setValue(e.target.value)}
        className="bg-primary-100 ml-6 h-8 w-[70%] rounded-lg pl-1 
        placeholder:pl-2"
        placeholder="Message"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-secondary-100 bg-primary-500 flex
        h-9 w-9 items-center justify-center rounded-full text-opacity-80 shadow"
      ></button>
    </form>
  );
}
