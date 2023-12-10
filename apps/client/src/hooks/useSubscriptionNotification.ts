import { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/server";

function useSubscriptionNotification() {
  const [hasSubscribeNotification, setHasSubscribeNotification] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  // useEffect(() => {
  //   if (!hasSubscribeNotification) {
  //     const sseEvent = new EventSource(
  //       `${SERVER_URL}/api/subscription_pathway`,
  //       {
  //         withCredentials: true,
  //       },
  //     );
  //     console.log('SSE connection : on');
  //     setHasSubscribeNotification(true)
  //     setEventSource(sseEvent)
  //   }
  //   () => {
  //     if (eventSource) {
  //       setHasSubscribeNotification(false)
  //       eventSource.close();
  //     }
  //   }
  // }, [eventSource])
  // export const sseEvent = new EventSource(
  //   `${SERVER_URL}/api/subscription_pathway`,
  //   {
  //     withCredentials: true,
  //   },
  // );
  return { hasSubscribeNotification, eventSource }
}

export default useSubscriptionNotification