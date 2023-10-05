import Button from '../../component/button';
import { useEffect, useState } from 'react';
import schema from 'schema';
import { CreateEventData } from '../../types';
import Input from '../../component/input';
import SelectInput from '../../component/select';
import InputDate from '../../component/date-picker';
import InputTime from '../../component/time-picker';
import { useCreateEvent } from '../../store/create-event.store';
import dateHandler from '../../utils/date.handler';
import Globe from '../../assets/icon/Globe';
import Users from '../../assets/icon/Users';
import Clock from '../../assets/icon/Clock';
import { Link } from 'react-router-dom';
import Plus from '../../assets/icon/Plus';
import CalendarClock from '../../assets/icon/CalendarClock';
import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { OPTION_DURATION, OPTION_FORMAT } from '../../constant/select.options';
const { createEventSchema } = schema;

function CreateEvent() {
  const { userProfile } = useApp();
  const [validationErrors, setValidationErrors] = useState(null); // TODO : handle error
  const {
    createEvent,
    data: eventCreatedState,
    updateDuration,
    updateLocation,
    updateOrganizerId,
    updateStartDate,
    updateStartTime,
    updateRequiredParticipants,
    clearEventState,
  } = useCreateEvent();
  const userId = userProfile?.user_id;

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const data: Partial<CreateEventData> | CreateEventData = {
      organizer_id: userId,
      status_name: 'open',
    };

    // TODO need to handle the case where user select today date but time is in the past
    // validation date and time
    if (eventCreatedState.start_time && eventCreatedState.start_date) {
      const eventDate = `${eventCreatedState.start_date} ${eventCreatedState.start_time}`;
      data.date = eventDate;
    }

    // validation duration
    if (eventCreatedState.duration) {
      data.duration = Number(eventCreatedState.duration);
    }

    // validation location
    if (eventCreatedState.location) {
      data.location = eventCreatedState.location;
    }

    // validation required participants
    if (eventCreatedState.required_participants) {
      data.required_participants = Number(
        eventCreatedState.required_participants
      );
    }

    const isValid = createEventSchema.safeParse(data);

    if (
      isValid.success &&
      data.date &&
      dateHandler.dateShouldBeInTheFuture(data.date)
    ) {
      createEvent(data);
      clearEventState();
      console.log('event created', eventCreatedState);
    } else {
      setValidationErrors(isValid.error.issues);
    }
  };

  // Not sure if this useEffect is needed
  useEffect(() => {
    updateOrganizerId(userId);
  }, []);

  const inputHasError = (
    nameInput: string,
    errors: Record<string, string>[] | null
  ): boolean => {
    if (!validationErrors) return false;
    return errors?.find((error) => error.path[0] === nameInput) ? true : false;
  };

  return (
    <>
      <ReturnBtn to="/" />
      <TitleH2 value="Create an new Event" />
      <form
        onSubmit={handleFormSubmit}
        className="px-3 flex flex-col items-center gap-y-4">
        <InputDate
          updateState={updateStartDate}
          actionType="SET_DATE"
          label="Select a date"
          defaultValue={eventCreatedState.start_date ?? ''}
          error={inputHasError('date', validationErrors)}
        />
        <InputTime
          label="Select a Time"
          name="time"
          type="text"
          readOnly
          placeholder="HH:mm"
          updateState={updateStartTime}
          defaultValues={eventCreatedState.start_time ?? ''}
          error={inputHasError('date', validationErrors)}>
          <CalendarClock />
        </InputTime>
        <SelectInput
          name="duration"
          label="Select a Duration"
          placeholder="duration in min"
          updateState={updateDuration}
          options={OPTION_DURATION}
          defaultValue={eventCreatedState.duration ?? ''}
          error={inputHasError('duration', validationErrors)}>
          <Clock />
        </SelectInput>
        <Input
          name="location"
          label="Select a Location"
          type="text"
          placeholder="City"
          updateState={updateLocation}
          defaultValue={eventCreatedState.location ?? ''}
          error={inputHasError('location', validationErrors)}>
          <Globe />
        </Input>
        <SelectInput
          name="requiredParticipants"
          label="Select a Format"
          updateState={updateRequiredParticipants}
          options={OPTION_FORMAT}
          defaultValue={eventCreatedState.required_participants ?? ''}
          error={inputHasError('duration', validationErrors)}>
          <Users />
        </SelectInput>
        <Link
          to="invitation"
          className="flex items-center underline underline-offset-8 un gap-2 py-4 text-md text-primary-1100 font-semibold cursor-pointer">
          <p>INVITE FRIENDS </p>
          <Plus />
        </Link>
        <Button
          textContent="Create Event"
          type="submit"
        />
      </form>
    </>
  );
}

export default CreateEvent;
