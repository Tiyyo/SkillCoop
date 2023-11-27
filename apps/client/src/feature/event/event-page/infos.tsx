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
import { updateEventFn } from '../../../api/api.fn';
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

interface EventPageInfosProps {
  eventDuration: number;
  eventlocation: string;
  eventDate: string;
  requiredParticipants: number;
  isAdmin: boolean;
  profileId: number;
  eventStatus: string;
}

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
  const {
    data: event,
    updateStartTime,
    updateLocation,
    updateDuration,
    updateStartDate,
    updateRequiredParticipants,
  } = useEvent();

  const handleClickEdit = () => {
    setIsEditActive(!isEditActive);
  };

  const updateEventData = {
    profile_id: profileId,
    event_id: Number(eventId),
  };

  const startTime = eventDate.split(' ')[1];

  // mutateOnBlur cause too many  notification send
  // mutate only once on validate button
  // So create 2 seperate button for each function
  // first to enable edit mode
  // second to mutate data and disable edit mode

  return (
    <Container className="flex-grow">
      <div className="flex justify-between items-center">
        <TitleH2
          title={`Event# ${eventId}`}
          legend="Event details informations"
        />
        <div className="flex justify-between items-baseline my-1 text-primary-1100 lg:px-6">
          {isAdmin && eventStatus !== 'completed' && (
            <div
              onClick={handleClickEdit}
              className="my-auto relative -top-0.5 cursor-pointer"
            >
              {isEditActive ? <Check size={16} /> : <Pencil size={16} />}
            </div>
          )}
        </div>
      </div>
      <div
        className="lg:flex lg:justify-center gap-x-3 items-center 
        w-full lg:px-6 sm:grid sm:grid-cols-2"
      >
        <InputDate
          updateState={updateStartDate}
          defaultValue={event.start_date ?? eventDate}
          updateData={updateEventData}
          mutateKey="date"
          mutateOnBlur={updateEventFn}
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
          updateData={updateEventData}
          mutateKey="date"
          mutateOnBlur={updateEventFn}
          disabled={!isEditActive}
        >
          <CalendarClock />
        </InputTime>
        <SelectInput
          name="duration"
          label="Duration"
          updateState={updateDuration}
          updateData={updateEventData}
          mutateKey="duration"
          mutateOnBlur={updateEventFn}
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
          mutateOnBlur={updateEventFn}
          disabled={!isEditActive}
          updateData={updateEventData}
          mutateKey="location"
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
          mutateOnBlur={updateEventFn}
          disabled={!isEditActive}
          updateData={updateEventData}
          mutateKey="required_participants"
        >
          <Users />
        </SelectInput>
      </div>
    </Container>
  );
}

export default EventPageInfos;
