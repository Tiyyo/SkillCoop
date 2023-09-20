import { useQuery } from "@tanstack/react-query";
import { EventType } from "../../types";
import EventList from "./EventList";
import { getEventsFn } from "../../api/authApi";
import { useStateContext } from "../../context/app.context";
import { useEffect, useState } from "react";
import Spinner from "../../component/loading";

function ResumeEvents() {
  const { state } = useStateContext();
  const userId: number = state.authUser.userProfile.user_id;
  const [events, setEvents] = useState<{
    incoming: EventType[] | null;
    past: EventType[] | null;
  }>({
    incoming: null,
    past: null,
  });
  const {
    data: allEvents,
    isError,
    isLoading,
    isFetching,
  } = useQuery(["getEvents"], () => getEventsFn(userId), { enabled: true });
  const loading = isLoading || isFetching;
  const today = new Date();

  useEffect(() => {
    if (!allEvents) return;
    setEvents((prev) => {
      return {
        ...prev,
        incoming: allEvents?.filter((event) => today < new Date(event.date)),
        past: allEvents?.filter((event) => today > new Date(event.date)),
      };
    });
  }, [allEvents, loading]);

  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <EventList events={events.incoming} title="Incoming" />
          <EventList events={events.past} title="Past" nbEventToDisplay={2} />
        </>
      )}
    </>
  );
}

export default ResumeEvents;
