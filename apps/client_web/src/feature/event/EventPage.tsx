import { useQuery } from '@tanstack/react-query';
import { getEventFn } from '../../api/authApi';
import { useLocation } from 'react-router-dom';
import ReturnBtn from '../../component/return';
import DropdownEventMenu from './DropdownEventMenu';

function EventPage() {
  const {
    state: { eventId },
  } = useLocation();
  const { data: event } = useQuery(
    ['event'],
    () => {
      return getEventFn(eventId);
    },
    { enabled: true }
  );
  return (
    <div>
      <div className="flex justify-between">
        <ReturnBtn />
        <DropdownEventMenu />
      </div>

      {event && (
        <div>
          <p>{event.location}</p>
        </div>
      )}
    </div>
  );
}

export default EventPage;
