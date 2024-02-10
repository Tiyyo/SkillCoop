import { getUTCString, isPastDate } from '@skillcoop/date-handler/src';
import { useApp } from '../../../shared/store/app.store';
import { useRef, useState } from 'react';
import { useMutateEvent } from '../store/create-event.store';
import { createEventSchema } from '@skillcoop/schema/src';
import toast from '../../../shared/utils/toast';
import { useTranslation } from 'react-i18next';

export default function useCreateEvent() {
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
  } = useMutateEvent();
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
  return {
    createEventFormRef,
    eventCreatedState,
    handleFormSubmit,
    inputHasError,
    isLoading,
    updateDuration,
    updateLocation,
    updateStartDate,
    updateStartTime,
    updateRequiredParticipants,
    validationErrors,
  };
}
