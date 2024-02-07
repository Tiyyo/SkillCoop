import Button from '../../../components/button';
import { useRef, useState } from 'react';
import { createEventSchema } from '@skillcoop/schema/src';
import Input from '../../../components/input';
import SelectInput from '../../../components/select';
import InputDate from '../../../components/date-picker';
import InputTime from '../../../components/time-picker';
import { useCreateEvent } from '../../../stores/create-event.store';
import Globe from '../../../assets/icon/Globe';
import Users from '../../../assets/icon/Users';
import Clock from '../../../assets/icon/Clock';
import { Link } from 'react-router-dom';
import Plus from '../../../assets/icon/Plus';
import CalendarClock from '../../../assets/icon/CalendarClock';
import TitleH2 from '../../../components/title-h2';
import { useApp } from '../../../stores/app.store';
import {
  OPTION_DURATION,
  OPTION_FORMAT,
} from '../../../constants/select.options';
import toast from '../../../utils/toast';
import Container from '../../../layouts/container';
import { getUTCString, isPastDate } from '@skillcoop/date-handler/src';
import { useTranslation } from 'react-i18next';

function CreateEvent() {
  const { t } = useTranslation('event');
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
      toast.error(t('toast:cannotCreateEventInPast'));
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
    <Container className=" h-full flex-grow pb-10 lg:mt-4 lg:rounded-lg">
      <div className="flex items-center justify-between pr-4">
        <TitleH2
          title={t('title:createNewEvent')}
          legend={t('title:createNewEventLegend')}
        />
        <Link
          to="invitation"
          className={`lg:text-smtext-base-light hover:text-text-base 
          flex cursor-pointer items-center gap-2 
          rounded-full bg-primary-800 px-2.5 py-2.5 text-xs 
          font-semibold shadow-md
          duration-300
         hover:bg-primary-500 sm:px-6`}
        >
          <p className="hidden sm:block">{t('inviteYourFriends')}</p>
          <Plus />
        </Link>
      </div>
      <form
        onSubmit={handleFormSubmit}
        ref={createEventFormRef}
        className="flex w-full flex-col items-center px-3"
      >
        <div
          className="flex w-full flex-col items-center gap-4 px-3 sm:grid 
        sm:grid-cols-2 "
        >
          <InputDate
            updateState={updateStartDate}
            actionType="SET_DATE"
            label={t('selectDate')}
            defaultValue={eventCreatedState.start_date ?? ''}
            error={inputHasError('start_date', validationErrors)}
            high
          />
          <InputTime
            label={t('selectTime') + ' HH:mm'}
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
            label={t('selectDuration')}
            placeholder={t('durationInMinutes')}
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
            label={t('selectLocation')}
            type="text"
            placeholder={t('city')}
            updateState={updateLocation}
            defaultValue={eventCreatedState.location ?? ''}
            error={inputHasError('location', validationErrors)}
            high
          >
            <Globe />
          </Input>
          <SelectInput
            name="requiredParticipants"
            label={t('selectFormat')}
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
          textContent={t('createEvent')}
          type="submit"
          isLoading={isLoading}
          className="mt-4"
        />
      </form>
    </Container>
  );
}

export default CreateEvent;
