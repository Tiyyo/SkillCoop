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

  return (
    <div className="bg-base-light mx-2 lg:py-4 rounded-md shadow py-2 px-3 w-full">
      <div className="flex justify-between items-baseline my-1 text-primary-1100 lg:px-6">
        <h2 className="text-sm lg:text-md font-bold">Event# {eventId}</h2>
        {isAdmin && eventStatus !== 'completed' && (
          <div
            onClick={handleClickEdit}
            className="my-auto relative -top-0.5 cursor-pointer"
          >
            {isEditActive ? <Check size={16} /> : <Pencil size={16} />}
          </div>
        )}
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
          disabled={!isEditActive}
        />
        <InputTime
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
    </div>
  );
}

export default EventPageInfos;
