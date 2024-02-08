import { useRef, useState } from 'react';
import { socket } from '../../socket';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('chat');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }

  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className=" mx-2 flex flex-row justify-center
      gap-3 text-xs last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl 
      lg:text-sm xl:max-w-3xl"
    >
      <div
        className="flex w-11/12 items-center 
          gap-x-4"
      >
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          name=""
          placeholder={`${t('typeYourMessage')} ...`}
          className="palceholder:text-light relative m-0 flex w-full 
            flex-grow resize-none flex-col overflow-hidden 
            rounded-lg border-0 bg-bubble px-2.5 py-2 focus:ring-0 
            focus-visible:ring-0  md:py-3.5 md:pl-[20px] md:pr-12"
        />
        <button
          type="submit"
          disabled={isLoading}
          className=" flex
          h-9 w-9 items-center justify-center rounded-full border border-border 
          text-opacity-80 shadow"
        >
          <Send size={20} className="text-primary-700" />
        </button>
      </div>
    </form>
  );
}
