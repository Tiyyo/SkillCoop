import { useState } from 'react';
import {
  Clock,
  Users,
  CalendarClock,
  Pencil,
  Check,
  UnlockKeyhole,
  Euro,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import SelectInput from '../../../shared/components/select';
import InputTime from '../../../shared/components/time-picker';
import InputDate from '../../../shared/components/date-picker';
import { useEvent } from '../store/event.store';
import {
  OPTION_DURATION,
  OPTION_FORMAT,
} from '../../../shared/constants/select.options';
import Container from '../../../shared/layouts/container';
import TitleH2 from '../../../shared/components/title-h2';
import { useUpdateSingleEvent } from '../../../shared/hooks/useSingleEvent';
import toast from '../../../shared/utils/toast';
import { updateEventSchema } from '@skillcoop/schema/src';
import type { EventStatus } from '@skillcoop/types/src';
import { isPastDate, getLocalStringCustom } from '@skillcoop/date-handler/src';
import { useTranslation } from 'react-i18next';
import InputLocation from '../../create-event/input-location';
import Input from '../../../shared/components/input';

type EventPageInfosProps = {
  eventDuration: number | null;
  eventlocation: string | null;
  eventDate: string | null;
  requiredParticipants: number | null;
  isAdmin: boolean;
  profileId: string;
  eventStatus: EventStatus | null;
  confirmedParticipants?: number | null;
};

function EventPageInfos({
  eventDuration,
  eventlocation,
  eventDate,
  eventStatus,
  requiredParticipants,
  isAdmin,
  profileId,
  confirmedParticipants,
}: EventPageInfosProps) {
  const { t } = useTranslation('event');
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const { eventId } = useParams<{ eventId: string }>();
  const { mutate: updateEvent } = useUpdateSingleEvent({
    eventId: Number(eventId),
    onSuccess: (response: any) => {
      setIsEditActive(false);
      if (response.message === 'Nothing to update') return;
      toast.success(t('eventUpdated'));
    },
  });
  const {
    data: event,
    updateStartTime,
    updateLocation,
    updateDuration,
    updateStartDate,
    updateRequiredParticipants,
    updateVisibility,
    updatePrice,
    updateStatusName,
  } = useEvent();

  const handleClickActiveEdit = () => {
    setIsEditActive(true);
  };

  const updateEventData = {
    profile_id: profileId,
    event_id: Number(eventId),
  };

  const displayEditBtnOrValidateBtn = () => {
    if (isEditActive) {
      return (
        <div
          onClick={() => {
            setIsEditActive(!isEditActive);
            if (
              !event.organizer_id ||
              event.organizer_id !== profileId ||
              !event.date
            )
              return;
            const data = {
              profile_id: profileId,
              event_id: Number(eventId),
              organizer_id: event.organizer_id,
              status_name: event.status_name ?? undefined,
              date: event.date,
              duration: Number(event.duration),
              location_id: event.location_id ?? undefined,
              required_participants: Number(event.required_participants),
              price: Number(event.price) ?? null,
              visibility: event.visibility ?? 'private',
            };
            if (confirmedParticipants === Number(event.required_participants)) {
              updateStatusName('full');
            }
            if (
              confirmedParticipants &&
              confirmedParticipants < Number(event.required_participants)
            ) {
              updateStatusName('open');
            }
            if (
              confirmedParticipants &&
              confirmedParticipants > Number(event.required_participants)
            ) {
              // This edge case shouldnt be possible at this stage but
              // just in case we are not
              // not allowing user to update the number of required participants
              // if there are
              // more confirmed participants than the new number
              // of required participants
              return;
            }
            const isValid = updateEventSchema.safeParse(data);
            if (isPastDate(data.date)) {
              toast.error(t('youCannotSetEventPast'));
              return;
            }
            if (!isValid.success) {
              toast.error(t('system:somethingWentWrong'));
              return;
            }
            updateEvent(data);
          }}
          className="relative -top-0.5 my-auto cursor-pointer"
        >
          <Check size={16} />
        </div>
      );
    }
    return (
      <div
        onClick={handleClickActiveEdit}
        className="relative -top-0.5 my-auto cursor-pointer"
      >
        <Pencil size={16} />
      </div>
    );
  };

  const playgroundHasPrice =
    event.price !== null && event.price !== undefined && event.price > 0;

  return (
    <Container className="flex-grow lg:rounded-lg">
      <div className="flex items-center justify-between">
        <TitleH2
          title={t('title:event') + ' ' + `#${eventId}`}
          legend={t('title:eventLegend')}
        />
        <div
          className="my-1 flex items-baseline justify-between 
        text-primary-1100 lg:px-6"
        >
          {isAdmin &&
            eventStatus !== 'completed' &&
            !isPastDate(eventDate) &&
            displayEditBtnOrValidateBtn()}
        </div>
      </div>
      <div
        className="w-full items-center gap-x-3 sm:grid 
        sm:grid-cols-2 lg:px-6 4xl:flex 4xl:justify-center"
      >
        <InputDate
          updateState={updateStartDate}
          defaultValue={
            getLocalStringCustom(new Date(eventDate!)).split(' ')[0]
          }
          updateData={updateEventData}
          mutateKey="date"
          label={t('date')}
          disabled={!isEditActive}
          high
        />
        <InputTime
          label={t('scheduleTime')}
          name="time"
          type="text"
          readOnly
          updateState={updateStartTime}
          defaultValues={
            getLocalStringCustom(new Date(eventDate!)).split(' ')[1]
          }
          disabled={!isEditActive}
          high
        >
          <CalendarClock />
        </InputTime>
        <SelectInput
          name="duration"
          label={t('duration')}
          updateState={updateDuration}
          mutateKey="duration"
          options={OPTION_DURATION}
          defaultValue={event.duration ?? eventDuration ?? undefined}
          disabled={!isEditActive}
          high
        >
          <Clock />
        </SelectInput>
        <InputLocation
          label={t('location')}
          updateLocationNameAndId={updateLocation}
          disabled={!isEditActive}
          defaultValue={event.location ?? eventlocation ?? undefined}
        />
        <SelectInput
          name="visibility"
          label={t('visibility')}
          updateState={updateVisibility}
          options={[
            { value: 'public', label: t('public') },
            { value: 'private', label: t('private') },
          ]}
          defaultValue={t(event.visibility ?? 'private')}
          disabled={!isEditActive}
          high
        >
          <UnlockKeyhole />
        </SelectInput>
        <SelectInput
          name="requiredParticipants"
          label={t('participants')}
          updateState={updateRequiredParticipants}
          options={OPTION_FORMAT}
          defaultValue={
            event.required_participants ?? requiredParticipants ?? undefined
          }
          disabled={!isEditActive}
          mutateKey="required_participants"
          high
        >
          <Users />
        </SelectInput>
        <Input
          name="price"
          label={t('playgroundPrice')}
          type="number"
          disabled={!isEditActive}
          value={playgroundHasPrice ? event.price! : 'NC'}
          updateState={updatePrice}
          high
        >
          <Euro />
        </Input>
      </div>
    </Container>
  );
}

export default EventPageInfos;
