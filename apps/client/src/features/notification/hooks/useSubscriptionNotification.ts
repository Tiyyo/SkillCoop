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
      `${SERVER_URL}/api/subscription-event`,
      {
        withCredentials: true,
      },
    );

    uniDirectionalConnection.onmessage = (event) => {
      console.log('event', event);
      if (onMessage) {
        onMessage(event);
      }
    };

    uniDirectionalConnection.onerror = (error) => {
      if (onError) {
        console.log('error', onError);
        onError(error);
      }
      uniDirectionalConnection.close();
    };
    return () => {
      uniDirectionalConnection.close();
    };
  }, []);
}

export default useSubscriptionNotification;
