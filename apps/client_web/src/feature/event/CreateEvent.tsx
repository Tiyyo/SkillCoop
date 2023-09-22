import Button from "../../component/button";
import { useStateContext } from "../../context/app.context";
import { useCreateEventContext } from "../../context/event.context";
import { useEffect } from "react";
import schema from "schema";
import { CreateEventData } from "../../types";
const { createEventSchema } = schema;

function CreateEvent() {
  const stateContext = useStateContext();
  const eventContext = useCreateEventContext();
  const userId = stateContext.state.userProfile.user_id;

  const getTodayFormatedForInput = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayFormated = `${year}-${month < 10 ? "0" + month : month}-${day}`;
    return todayFormated;
  };

  const dateShouldBeInTheFuture = (date: string) => {
    const today = new Date();
    const dateToCompare = new Date(date);
    return dateToCompare > today;
  };

  const getFormatedTime = (time: string) => {
    return `${time}:0.000`;
  };
  // need to handle the case where user select today date but time is in the past

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const data: CreateEventData = {
      organizer_id: userId,
      status_name: "open",
    };

    // validation date and time
    if (eventContext.state.start_time && eventContext.state.start_date) {
      const formatedTime = getFormatedTime(eventContext.state.start_time);
      const eventDate = `${eventContext.state.start_date} ${formatedTime}`;
      data.date = eventDate;
    }

    // validation duration
    if (eventContext.state.duration) {
      data.duration = Number(eventContext.state.duration);
    }

    // validation location
    if (eventContext.state.location) {
      data.location = eventContext.state.location;
    }

    // validation required participants
    if (eventContext.state.required_participants) {
      data.required_participants = Number(
        eventContext.state.required_participants
      );
    }


    const isValid = createEventSchema.safeParse(data);

    console.log(isValid);
    if (isValid.success) {
      eventContext.createEvent(data);
    }

  };

  const updateCreateEventState = (e: any, actionType: string) => {
    eventContext.dispatch({ type: actionType, payload: e.target.value });
  };

  useEffect(() => {
    eventContext.dispatch({ type: "SET_ORGANIZER_ID", payload: userId });
  }, []);

  return (
    <>
      <div>
        <button>Go Back</button>
      </div>
      <h2>Create an new Event</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Select a Date</label>
        <input
          name="date"
          type="date"
          min={getTodayFormatedForInput()}
          placeholder="start date"
          onChange={(e) => updateCreateEventState(e, "SET_DATE")}
        />
        <input
          name="time"
          type="time"
          placeholder="start time"
          onChange={(e) => updateCreateEventState(e, "SET_TIME")}
        />
        <label
          htmlFor="duration"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select a Duration
        </label>
        <select
          name="duration"
          className="bg-base-light border text-primary-1100 text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5 "
          onChange={(e) => updateCreateEventState(e, "SET_DURATION")}
        >
          <option>Choose a duration</option>
          <option value={45}>45 min</option>
          <option value={60}>1H</option>
          <option value={90}>1H30</option>
          <option value={120}>2H</option>
        </select>
        <label>Select a Location</label>
        <input
          name="location"
          type="text"
          placeholder="city"
          onChange={(e) => updateCreateEventState(e, "SET_LOCATION")}
        />
        <label
          htmlFor="requiredParticipants"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select a format
        </label>
        <select
          name="requiredParticipants"
          className="bg-base-light border text-primary-1100 text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5 "
          onChange={(e) =>
            updateCreateEventState(e, "SET_REQUIRED_PARTICIPANTS")
          }
        >
          <option>Choose your event format</option>
          <option value={6}>3V3</option>
          <option value={10}>5V5</option>
          <option value={14}>7V7</option>
          <option value={22}>11V11</option>
        </select>
        <Button textContent="Create Event" type="submit" />
      </form>
    </>
  );
}

export default CreateEvent;
