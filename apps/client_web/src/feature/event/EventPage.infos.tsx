import { useEffect, useState } from 'react';
import Input from '../../component/input';
import {
  Globe,
  Clock,
  Users,
  CalendarClock,
  Pencil,
  Check,
} from 'lucide-react';
import { updateEventFn } from '../../api/authApi';
import { useLocation } from 'react-router-dom';
import SelectInput from '../../component/select';
import InputTime from '../../component/time-picker';
import InputDate from '../../component/date-picker';
import { useEvent } from '../../store/event.store';

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
  const location = useLocation();
  const {
    data: event,
    initEventState,
    updateStartTime,
    updateLocation,
    updateDuration,
    updateStartDate,
    updateRequiredParticipants,
  } = useEvent();
  const eventId = location.state.eventId;

  const handleClickEdit = () => {
    setIsEditActive(!isEditActive);
  };

  const updateEventData = {
    profile_id: profileId,
    event_id: eventId,
  };

  const optionsDuration = [
    { label: '45 min', value: 45 },
    { label: '1H', value: 60 },
    { label: '1H30', value: 90 },
    { label: '2H', value: 120 },
  ];

  const optionsFormat = [
    { label: '3V3', value: 6 },
    { label: '5V5', value: 10 },
    { label: '7V7', value: 14 },
    { label: '11V11', value: 22 },
  ];

  const startTime = eventDate.split(' ')[1];

  useEffect(() => {
    initEventState({
      start_date: eventDate,
      duration: eventDuration,
      location: eventlocation,
      required_participants: requiredParticipants,
      start_time: eventDate.split(' ')[1],
      status_name: eventStatus,
    });
  }, []);

  return (
    <div className="bg-base-light mx-2 my-4 rounded-md shadow py-2 px-3">
      {isAdmin && (
        <div className="flex justify-between items-baseline my-1 text-primary-1100">
          <h2 className="text-sm font-bold">Event# {eventId}</h2>
          <p
            onClick={handleClickEdit}
            className="my-auto relative -top-0.5 cursor-pointer">
            {isEditActive ? <Check size={16} /> : <Pencil size={16} />}
          </p>
        </div>
      )}
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
        disabled={!isEditActive}>
        <CalendarClock />
      </InputTime>
      <SelectInput
        name="duration"
        updateState={updateDuration}
        updateData={updateEventData}
        mutateKey="duration"
        mutateOnBlur={updateEventFn}
        options={optionsDuration}
        defaultValue={event.duration ?? eventDuration}
        disabled={!isEditActive}>
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
        defaultValue={event.location ?? eventlocation}>
        <Globe />
      </Input>
      <SelectInput
        name="requiredParticipants"
        updateState={updateRequiredParticipants}
        options={optionsFormat}
        defaultValue={event.required_participants ?? requiredParticipants}
        mutateOnBlur={updateEventFn}
        disabled={!isEditActive}
        updateData={updateEventData}
        mutateKey="required_participants">
        <Users />
      </SelectInput>
    </div>
  );
}

export default EventPageInfos;
