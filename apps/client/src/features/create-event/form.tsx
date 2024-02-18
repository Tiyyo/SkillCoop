import Button from '../../shared/components/button';
import SelectInput from '../../shared/components/select';
import InputDate from '../../shared/components/date-picker';
import InputTime from '../../shared/components/time-picker';
import { CreateEventStateStore } from './store/create-event.store';
import Users from '../../assets/icon/Users';
import Clock from '../../assets/icon/Clock';
import CalendarClock from '../../assets/icon/CalendarClock';
import {
  OPTION_DURATION,
  OPTION_FORMAT,
} from '../../shared/constants/select.options';
import { useTranslation } from 'react-i18next';
import AddNewPlayground from './create-playground';
import { useState } from 'react';
import InputLocation from './input-location';
import { Visibility } from '@skillcoop/types/src';
import { Euro, UnlockKeyhole } from 'lucide-react';
import Input from '../../shared/components/input';

type CreateEventFormProps = {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  createEventFormRef: React.RefObject<HTMLFormElement>;
  eventCreatedState: CreateEventStateStore;
  inputHasError: (name: string, validationErrors: any) => boolean;
  isLoading: boolean;
  updateDuration: (value: number) => void;
  updateLocation: (value: number) => void;
  updateStartDate: (value: string) => void;
  updateStartTime: (value: string) => void;
  updateRequiredParticipants: (value: number) => void;
  updatePrice: (value: number) => void;
  updateVisibility: (value: Visibility) => void;
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
  updatePrice,
  updateVisibility,
  validationErrors,
}: CreateEventFormProps) {
  const { t } = useTranslation('event');
  const [displayCreatePlayground, setDisplayCreatePlayground] = useState(false);

  return (
    <div className="flex w-full flex-col items-center px-3 py-6">
      <form
        id="create-event"
        onSubmit={handleFormSubmit}
        ref={createEventFormRef}
      />
      <div
        className="flex w-full flex-col items-start gap-4 px-3 
        sm:grid sm:grid-cols-2"
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
        <SelectInput
          name="visibility"
          label="Select a visibility"
          updateState={updateVisibility}
          options={[
            { value: 'public', label: t('public') },
            { value: 'private', label: t('private') },
          ]}
          defaultValue={eventCreatedState.visibility ?? ''}
          error={inputHasError('visibility', validationErrors)}
          high
        >
          <UnlockKeyhole />
        </SelectInput>
        <InputLocation
          error={inputHasError('location', validationErrors)}
          updateLocationId={updateLocation}
          setCreatePlayground={setDisplayCreatePlayground}
          label={t('selectPlayground')}
          placeholder={t('choosePlayground')}
        />
        {displayCreatePlayground && <AddNewPlayground />}
        <Input
          name="price"
          label={t('playgroundPrice')}
          placeholder={t('indicatePlaygroundPrice')}
          updateState={updatePrice}
          error={inputHasError('price', validationErrors)}
          type="number"
          high
        >
          <Euro />
        </Input>
      </div>
      <Button
        textContent={t('createEvent')}
        formId="create-event"
        type="submit"
        isLoading={isLoading}
        className="mt-4"
      />
    </div>
  );
}

export default CreateEventForm;
