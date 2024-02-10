import Button from '../../components/button';
import Input from '../../components/input';
import SelectInput from '../../components/select';
import InputDate from '../../components/date-picker';
import InputTime from '../../components/time-picker';
import { CreateEventStateStore } from './store/create-event.store';
import Globe from '../../assets/icon/Globe';
import Users from '../../assets/icon/Users';
import Clock from '../../assets/icon/Clock';
import CalendarClock from '../../assets/icon/CalendarClock';
import {
  OPTION_DURATION,
  OPTION_FORMAT,
} from '../../shared/constants/select.options';
import { useTranslation } from 'react-i18next';

type CreateEventFormProps = {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  createEventFormRef: React.RefObject<HTMLFormElement>;
  eventCreatedState: CreateEventStateStore;
  inputHasError: (name: string, validationErrors: any) => boolean;
  isLoading: boolean;
  updateDuration: (value: number) => void;
  updateLocation: (value: string) => void;
  updateStartDate: (value: string) => void;
  updateStartTime: (value: string) => void;
  updateRequiredParticipants: (value: number) => void;
  validationErrors: any;
};

function CreateEventForm({
  handleFormSubmit,
  createEventFormRef,
  eventCreatedState,
  inputHasError,
  isLoading,
  updateDuration,
  updateLocation,
  updateStartDate,
  updateStartTime,
  updateRequiredParticipants,
  validationErrors,
}: CreateEventFormProps) {
  const { t } = useTranslation('event');
  return (
    <form
      onSubmit={handleFormSubmit}
      ref={createEventFormRef}
      className="flex w-full flex-col items-center px-3 py-6"
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
  );
}

export default CreateEventForm;
