import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface ErrorNotificationProps {
  message?: string;
  interval?: number;
}

function ErrorNotification({
  message,
  interval = 3500,
}: ErrorNotificationProps) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const closeAfterXSeconds = setTimeout(() => {
    setIsOpen(false);
  }, interval);

  useEffect(() => {
    console.log('message', message);
    console.log('errorMessage', errorMessage);
    if (message) {
      setIsOpen(true);
      setErrorMessage(message);
    }
    closeAfterXSeconds;
    () => {
      clearTimeout(closeAfterXSeconds);
      return setErrorMessage(undefined);
    };
  }, [message, errorMessage]);

  return (
    <div
      className={cn(
        'relative py-4 px-2 my-4 bg-error-light rounded-md',
        !isOpen && 'hidden',
      )}
    >
      <X
        size={16}
        className="absolute top-2 right-2 text-error cursor-pointer 
          h-6 w-6 py-0.5 hover:bg-opacity-5 hover:bg-gray-600 rounded"
        onClick={() => setIsOpen(false)}
      />
      <p className="text-xs text-center">{errorMessage}</p>
    </div>
  );
}

export default ErrorNotification;
