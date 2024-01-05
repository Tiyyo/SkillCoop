import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

type ErrorNotificationProps = {
  message?: string;
  interval?: number;
  key: number;
};

function ErrorNotification({
  message,
  interval = 3500,
  key,
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
  }, [message, key]);

  return (
    <div
      className={cn(
        'relative py-5 px-8 my-4 bg-error-light rounded-md w-full',
        !isOpen && 'hidden',
      )}
    >
      <X
        size={10}
        className="absolute top-1 right-1 text-error cursor-pointer 
          h-6 w-6 py-0.5 hover:bg-opacity-5 hover:bg-gray-600 rounded"
        onClick={() => setIsOpen(false)}
      />
      <p className="text-xs text-center">{message}</p>
    </div>
  );
}

export default ErrorNotification;
