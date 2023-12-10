import { useState } from 'react';
import Input from '../../../component/input';
import {
  Globe,
  Clock,
  Users,
  CalendarClock,
  Pencil,
  Check,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import SelectInput from '../../../component/select';
import InputTime from '../../../component/time-picker';
import InputDate from '../../../component/date-picker';
import { useEvent } from '../../../store/event.store';
import {
  OPTION_DURATION,
  OPTION_FORMAT,
} from '../../../constant/select.options';
import Container from '../../../layout/container';
import TitleH2 from '../../../component/title-h2';
import { useUpdateSingleEvent } from '../../../hooks/useSingleEvent';
import toast from '../../../utils/toast';
import { updateEventSchema } from 'schema/ts-schema';
import dateHandler from '../../../utils/date.handler';

type EventPageInfosProps = {
  eventDuration: number;
  eventlocation: string;
  eventDate: string;
  requiredParticipants: number;
  isAdmin: boolean;
  profileId: number;
  eventStatus: string;
};

function EventPageInfos({
  eventDuration,
  eventlocation,
  eventDate,
  eventStatus,
  requiredParticipants,
  isAdmin,
  profileId,
}: EventPageInfosProps) {
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const { eventId } = useParams<{ eventId: string }>();
  const { mutate: updateEvent } = useUpdateSingleEvent({
    eventId: Number(eventId),
    onSuccess: (response: any) => {
      setIsEditActive(false);
      if (response.message === 'Nothing to update') return;
      toast.success('Event updated');
    },
  });
  const {
    data: event,
    updateStartTime,
    updateLocation,
    updateDuration,
    updateStartDate,
    updateRequiredParticipants,
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
            if (!event.organizer_id || event.organizer_id !== profileId) return;
            const data = {
              profile_id: profileId,
              event_id: Number(eventId),
              organizer_id: event.organizer_id,
              status_name: event.status_name ?? undefined,
              date: `${event.start_date} ${event.start_time}`,
              duration: Number(event.duration),
              location: event.location ?? undefined,
              required_participants: Number(event.required_participants),
            };
            const isValid = updateEventSchema.safeParse(data);
            if (
              !isValid.success ||
              !dateHandler.dateShouldBeInTheFuture(data.date)
            ) {
              toast.error('Something went wrong... try again later');
              return;
            }
            updateEvent(data);
          }}
          className="my-auto relative -top-0.5 cursor-pointer"
        >
          <Check size={16} />
        </div>
      );
    }
    return (
      <div
        onClick={handleClickActiveEdit}
        className="my-auto relative -top-0.5 cursor-pointer"
      >
        <Pencil size={16} />
      </div>
    );
  };

  const startTime = eventDate.split(' ')[1];

  return (
    <Container className="flex-grow">
      <div className="flex justify-between items-center">
        <TitleH2
          title={`Event# ${eventId}`}
          legend="Event details informations"
        />
        <div className="flex justify-between items-baseline my-1 text-primary-1100 lg:px-6">
          {isAdmin &&
            eventStatus !== 'completed' &&
            displayEditBtnOrValidateBtn()}
        </div>
      </div>
      <div
        className="2xl:flex 2xl:justify-center gap-x-3 items-center 
        w-full lg:px-6 sm:grid sm:grid-cols-2"
      >
        <InputDate
          updateState={updateStartDate}
          defaultValue={event.start_date ?? eventDate}
          updateData={updateEventData}
          mutateKey="date"
          label="Date"
          disabled={!isEditActive}
        />
        <InputTime
          label="Schedule Time"
          name="time"
          type="text"
          readOnly
          updateState={updateStartTime}
          defaultValues={event.start_time ?? startTime}
          date={eventDate}
          disabled={!isEditActive}
        >
          <CalendarClock />
        </InputTime>
        <SelectInput
          name="duration"
          label="Duration"
          updateState={updateDuration}
          mutateKey="duration"
          options={OPTION_DURATION}
          defaultValue={event.duration ?? eventDuration}
          disabled={!isEditActive}
        >
          <Clock />
        </SelectInput>
        <Input
          name="location"
          label="Location"
          type="text"
          updateState={updateLocation}
          disabled={!isEditActive}
          defaultValue={event.location ?? eventlocation}
        >
          <Globe />
        </Input>
        <SelectInput
          name="requiredParticipants"
          label="Participants"
          updateState={updateRequiredParticipants}
          options={OPTION_FORMAT}
          defaultValue={event.required_participants ?? requiredParticipants}
          disabled={!isEditActive}
          mutateKey="required_participants"
        >
          <Users />
        </SelectInput>
      </div>
    </Container>
  );
}

export default EventPageInfos;
