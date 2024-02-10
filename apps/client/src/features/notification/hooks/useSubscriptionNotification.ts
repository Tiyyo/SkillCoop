import { useEffect } from 'react';
import { SERVER_URL } from '../../../shared/utils/server';

type SubscriptionNotification = {
  onMessage?: (event: MessageEvent) => void;
  onError?: (error: Event) => void;
};

function useSubscriptionNotification({
  onMessage,
  onError,
}: SubscriptionNotification) {
  useEffect(() => {
    const uniDirectionalConnection = new EventSource(
      `${SERVER_URL}/api/subscription_pathway`,
      {
        withCredentials: true,
      },
    );

    uniDirectionalConnection.onmessage = (event) => {
      if (onMessage) {
        onMessage(event);
      }
    };

    uniDirectionalConnection.onerror = (error) => {
      if (onError) {
        onError(error);
      }
      uniDirectionalConnection.close(); // Close the connection on error
    };
    // Clean up the EventSource when the component unmounts
    return () => {
      uniDirectionalConnection.close();
    };
  }, []);
}

export default useSubscriptionNotification;
