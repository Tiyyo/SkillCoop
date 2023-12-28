import Button from '../../../component/button';
import { useRef, useState } from 'react';
import { createEventSchema } from 'schema/ts-schema';
import Input from '../../../component/input';
import SelectInput from '../../../component/select';
import InputDate from '../../../component/date-picker';
import InputTime from '../../../component/time-picker';
import { useCreateEvent } from '../../../store/create-event.store';
import Globe from '../../../assets/icon/Globe';
import Users from '../../../assets/icon/Users';
import Clock from '../../../assets/icon/Clock';
import { Link } from 'react-router-dom';
import Plus from '../../../assets/icon/Plus';
import CalendarClock from '../../../assets/icon/CalendarClock';
import TitleH2 from '../../../component/title-h2';
import { useApp } from '../../../store/app.store';
import {
  OPTION_DURATION,
  OPTION_FORMAT,
} from '../../../constant/select.options';
import toast from '../../../utils/toast';
import Container from '../../../layout/container';
import { getUTCString, isPastDate } from 'date-handler/src';

function CreateEvent() {
  const { userProfile } = useApp();
  const createEventFormRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const {
    createEvent,
    data: eventCreatedState,
    isLoading,
    updateDuration,
    updateLocation,
    updateStartDate,
    updateStartTime,
    updateRequiredParticipants,
  } = useCreateEvent();
  const profileId = userProfile?.profile_id;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // This is unmaintainable and hard to read
    e.preventDefault();
    if (!profileId) return;
    const data = {
      organizer_id: profileId,
      status_name: 'open',
      start_date: eventCreatedState.start_date,
      start_time: eventCreatedState.start_time,
      date: `${eventCreatedState.start_date} ${eventCreatedState.start_time}`,
      participants: eventCreatedState.participants ?? undefined,
      duration: Number(eventCreatedState.duration) ?? undefined,
      location: eventCreatedState.location ?? undefined,
      required_participants:
        Number(eventCreatedState.required_participants) ?? undefined,
    };
    const isValid = createEventSchema.safeParse(data);
    if (!isValid.success) {
      setValidationErrors((isValid as any).error.issues);
      return;
    }
    const isPast = isPastDate(data.date);
    if (isPast) {
      toast.error('You cannot create an event in the past');
      return;
    }
    data.date = getUTCString(new Date(data.date));
    //@ts-ignore
    createEvent(data);
    createEventFormRef.current?.reset();
  };

  // find if an input has an error
  //to display an UI indication to the user
  const inputHasError = (
    nameInput: string,
    errors: Record<string, string>[] | null,
  ): boolean => {
    if (!validationErrors) return false;
    return errors?.find((error) => error.path[0] === nameInput) ? true : false;
  };

  return (
    <Container className=" flex-grow lg:mt-4 pb-10 h-full">
      <div className="flex justify-between items-center pr-4">
        <TitleH2
          title="Create a new Event"
          legend="Set the details and start something special"
        />
        <Link
          to="invitation"
          className={`flex shadow-md items-center gap-2 py-2.5 text-xs lg:text-sm
           text-base-light bg-primary-800 px-2.5 sm:px-6 rounded-full f
            ont-semibold cursor-pointer hover:text-dark hover:bg-primary-500 duration-300`}
        >
          <p className="hidden sm:block">Invite your friends</p>
          <Plus />
        </Link>
      </div>
      <form
        onSubmit={handleFormSubmit}
        ref={createEventFormRef}
        className="px-3 flex flex-col items-center w-full"
      >
        <div
          className="w-full px-3 flex flex-col items-center gap-4 sm:grid 
        sm:grid-cols-2 "
        >
          <InputDate
            updateState={updateStartDate}
            actionType="SET_DATE"
            label="Select a date"
            defaultValue={eventCreatedState.start_date ?? ''}
            error={inputHasError('start_date', validationErrors)}
            high
          />
          <InputTime
            label="Select a Time - HH:mm"
            name="time"
            type="text"
            readOnly
            updateState={updateStartTime}
            defaultValues={eventCreatedState.start_time ?? ''}
            error={inputHasError('start_time', validationErrors)}
            high
          >
            <CalendarClock />
          </InputTime>
          <SelectInput
            name="duration"
            label="Select a Duration"
            placeholder="duration in min"
            updateState={updateDuration}
            options={OPTION_DURATION}
            defaultValue={eventCreatedState.duration ?? ''}
            error={inputHasError('duration', validationErrors)}
            high
          >
            <Clock />
          </SelectInput>
          <Input
            name="location"
            label="Select a Location"
            type="text"
            placeholder="City"
            updateState={updateLocation}
            defaultValue={eventCreatedState.location ?? ''}
            error={inputHasError('location', validationErrors)}
            high
          >
            <Globe />
          </Input>
          <SelectInput
            name="requiredParticipants"
            label="Select a Format"
            updateState={updateRequiredParticipants}
            options={OPTION_FORMAT}
            defaultValue={eventCreatedState.required_participants ?? ''}
            error={inputHasError('required_participants', validationErrors)}
            high
          >
            <Users />
          </SelectInput>
        </div>
        <Button
          textContent="Create Event"
          type="submit"
          isLoading={isLoading}
          className="mt-4"
        />
      </form>
    </Container>
  );
}

export default CreateEvent;
