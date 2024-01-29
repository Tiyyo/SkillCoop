import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

type ErrorNotificationProps = {
  message?: string;
  interval?: number;
  triggerRender: number;
};

function ErrorNotification({
  message,
  interval = 3500,
  triggerRender,
}: ErrorNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | undefined>('');

  useEffect(() => {
    setCurrentMessage(message);
    if (message !== currentMessage) {
      setIsOpen(true);

      const timer = setTimeout(() => {
        setIsOpen(false);
        setCurrentMessage('');
      }, interval);

      return () => clearTimeout(timer);
    }
  }, [message, triggerRender]);

  return (
    <div
      className={cn(
        'relative my-4 w-full rounded-md bg-error-light px-8 py-5',
        !isOpen && 'hidden',
      )}
    >
      <X
        size={10}
        className="absolute right-1 top-1 h-6 w-6 cursor-pointer 
        rounded py-0.5 text-error hover:bg-gray-600 hover:bg-opacity-5"
        onClick={() => setIsOpen(false)}
      />
      <p className="text-center text-xs">{message}</p>
    </div>
  );
}

export default ErrorNotification;
