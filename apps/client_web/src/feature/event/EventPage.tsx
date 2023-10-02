import { useQuery } from '@tanstack/react-query';
import { getEventFn } from '../../api/authApi';
import { useLocation } from 'react-router-dom';
import ReturnBtn from '../../component/return';
import DropdownEventMenu from './DropdownEventMenu';
import CallToActionInvitation from './CallToActionInvitation';
import { useApp } from '../../store/app.store';
import EventPageInfos from './EventPage.infos';

function EventPage() {
  const {
    state: { eventId },
  } = useLocation();
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;

  const { data: event } = useQuery(
    ['event'],
    () => {
      if (!profileId) return;
      return getEventFn(eventId, profileId);
    },
    { enabled: true }
  );

  console.log(event);
  return (
    <div>
      <div className="flex justify-between items-start py-2 bg-base-light mx-2 my-4 rounded-md shadow">
        <ReturnBtn />
        <CallToActionInvitation
          userStatus={event?.user_status}
          eventId={event?.event_id}
          profileId={profileId}
        />
        <DropdownEventMenu
          profileId={profileId}
          isAdmin={event?.organizer_id === profileId}
          eventId={eventId}
        />
      </div>
      {event && (
        <EventPageInfos
          eventDuration={event.duration}
          eventlocation={event?.location}
          eventDate={event?.date}
          requiredParticipants={event?.required_participants}
          profileId={profileId ?? 0}
          organizerId={event?.organizer_id}
          eventStatus={event?.status_name}
          isAdmin={event?.organizer_id === profileId}
        />
        // <div className=" bg-base-light mx-2 my-4 rounded-md shadow py-2 px-3">
        //   <h2 className="text-lg font-semibold">Event #{event.event_id}</h2>
        //   <input value={event.location} />
        //   <input value={event.date} />
        //   <input value={event.date} />
        //   <input value={event.duration} />
        //   <input value={event.required_participants} />
        // </div>
      )}
      {event && (
        <div className=" bg-base-light mx-2 my-4 rounded-md shadow py-2 px-3">
          <h2 className="text-sm">Participants</h2>
          <ul>
            {event.participants.map((participant) => (
              <>
                <img
                  src={
                    participant.avatar
                      ? participant.avatar
                      : '/images/default-avatar.png'
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex gap-2">
                  <p>{participant.username}</p>
                  {participant.status === 'confirmed' && (
                    <p className="text-green-500">Confirmed</p>
                  )}
                </div>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EventPage;
