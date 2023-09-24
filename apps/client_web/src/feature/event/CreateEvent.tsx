import Button from "../../component/button";
import { useStateContext } from "../../context/app.context";
import { useCreateEventContext } from "../../context/event.context";
import { useEffect } from "react";
import schema from "schema";
import { CreateEventData } from "../../types";
import Input from "../../component/input";
import SelectInput from "../../component/select";
import InputDate from "../../component/date-picker";
import InputTime from "../../component/time-picker";
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

    if (isValid.success && dateShouldBeInTheFuture(data.date)) {
      eventContext.createEvent(data);
    }
  };

  const updateCreateEventState = (e: any, actionType: string) => {
    eventContext.dispatch({ type: actionType, payload: e.target?.value ?? e });
  };

  useEffect(() => {
    eventContext.dispatch({ type: "SET_ORGANIZER_ID", payload: userId });
  }, []);

  const optionsDuration = [
    { label: "45 min", value: 45 },
    { label: "1H", value: 60 },
    { label: "1H30", value: 90 },
    { label: "2H", value: 120 },
  ];

  const optionsFormat = [
    { label: "3V3", value: 6 },
    { label: "5V5", value: 10 },
    { label: "7V7", value: 14 },
    { label: "11V11", value: 22 },
  ];

  return (
    <>
      <div>
        <button>Go Back</button>
      </div>
      <h2>Create an new Event</h2>
      <form onSubmit={handleFormSubmit} className="px-3 flex flex-col items-center gap-y-4">
        <InputDate updateState={updateCreateEventState} actionType="SET_DATE" label='Select a date'/>
        <InputTime/>
        <Input
          label="Select a Time"
          name="time"
          type="time"
          placeholder="starting time"
          actionType="SET_TIME"
          step={3600}
          updateState={updateCreateEventState}
        />
        <SelectInput
          name="duration"
          label="Select a Duration"
          placeholder="duration in min"
          updateState={updateCreateEventState}
          actionType="SET_DURATION"
          options={optionsDuration}
        />
        <Input
          name="location"
          label="Select a Location"
          type="text"
          placeholder="city"
          updateState={updateCreateEventState}
          actionType="SET_LOCATION"
        />
        <SelectInput
          name="requiredParticipants"
          label="Select a Format"
          updateState={updateCreateEventState}
          actionType="SET_REQUIRED_PARTICIPANTS"
          options={optionsFormat}
        />
        <Button textContent="Create Event" type="submit" />
      </form>
    </>
  );
}

export default CreateEvent;
