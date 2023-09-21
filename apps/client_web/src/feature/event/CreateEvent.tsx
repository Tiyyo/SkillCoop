import { useMutation } from "@tanstack/react-query";
import Button from "../../component/button";
import { useStateContext } from "../../context/app.context";
import { createEventFn } from "../../api/authApi";

function CreateEvent() {
  const stateContext = useStateContext();
  const userId = stateContext.state.authUser.userProfile.user_id;
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

  const {
    mutate: createEvent,
    isLoading,
    isError,
    isSuccess,
  } = useMutation((data) => createEventFn(data));

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formatedTime = getFormatedTime(e.target.time.value);
    const eventDate = `${e.target.date.value} ${formatedTime}`;
    const data = {
      date: eventDate,
      duration: Number(e.target.duration.value),
      location: e.target.location.value,
      required_participants: Number(e.target.requiredParticipants.value),
      organizer_id: userId,
      status_name: "open",
    };
    createEvent(data);

    console.log(eventDate);
  };

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
        />
        <input name="time" type="time" placeholder="start time" />
        <label
          htmlFor="duration"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select a Duration
        </label>
        <select
          name="duration"
          className="bg-base-light border text-primary-1100 text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5 "
        >
          <option selected>Choose a duration</option>
          <option value={45}>45 min</option>
          <option value={60}>1H</option>
          <option value={90}>1H30</option>
          <option value={120}>2H</option>
        </select>
        <label>Select a Location</label>
        <input name="location" type="text" placeholder="city" />
        <label
          htmlFor="requiredParticipants"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select a format
        </label>
        <select
          name="requiredParticipants"
          className="bg-base-light border text-primary-1100 text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5 "
        >
          <option selected>Choose your event format</option>
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
