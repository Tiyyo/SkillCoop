import { useEffect, useState } from 'react';
import TitleH2 from '../../shared/components/title-h2';
import Container from '../../shared/layouts/container';
import { useApp } from '../../shared/store/app.store';
import { useQuery } from '@tanstack/react-query';
import { getReverseGeoCodingCountryFn } from '../../api/mapbox';
import { getNearestEventsFn } from '../../api/event.fn';
import { getDate, getStartingTime } from '@skillcoop/date-handler/src';
import NearEventCard from './card';
import NotFoundMessage from '../../shared/components/not-found-message';
import Spinner from '../../shared/components/spinner';
import FindEventsFilters from './filters';
import useFindEventsFilters from './hooks/useFindEventsFilters';
import { dateCompare } from '../../shared/utils/date-compare';
/*eslint-disable*/
import { getCurrentLngInLocalStorage } from '../../shared/utils/get-current-lng';
/*eslint-enable*/

type Localisation = {
  latitude: number | null;
  longitude: number | null;
};

function FindEvents() {
  const { userProfile, userId } = useApp();
  const [currentLocalisation, setCurrentLocalisation] = useState<Localisation>({
    latitude: null,
    longitude: null,
  });
  const { distance, setDistance, sortByDate, setSortByDate } =
    useFindEventsFilters();

  const { data: currentCountry } = useQuery(
    ['geocoding', currentLocalisation.latitude, currentLocalisation.longitude],
    async () => {
      if (!currentLocalisation.latitude || !currentLocalisation.longitude)
        return null;
      return getReverseGeoCodingCountryFn(
        currentLocalisation.longitude,
        currentLocalisation.latitude,
      );
    },
  );

  const { data: nearestEvents, isLoading } = useQuery(
    [
      'nearest-events',
      currentCountry,
      distance,
      currentLocalisation.latitude,
      currentLocalisation.longitude,
    ],
    async () => {
      if (
        !currentCountry ||
        !currentLocalisation.latitude ||
        !currentLocalisation.longitude ||
        !userId
      )
        return null;
      return getNearestEventsFn({
        userCountry: userProfile?.location ?? currentCountry,
        distance: Number(distance),
        userLatitude: currentLocalisation.latitude,
        userLongitude: currentLocalisation.longitude,
        profileId: userId,
      });
    },
  );
  const currentLng = getCurrentLngInLocalStorage();

  useEffect(() => {
    if (userProfile && !userProfile.location) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocalisation((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    }
  }, []);
  return (
    <>
      <Container className="lg:mt-4">
        <div className="flex items-center justify-between">
          <TitleH2
            title="Find events"
            legend="Find all events that need player in your aera"
          />
          <FindEventsFilters
            distance={distance}
            setDistance={setDistance}
            sortDate={sortByDate}
            setSortDate={setSortByDate}
          />
        </div>
      </Container>
      {(!nearestEvents || nearestEvents.length === 0) && !isLoading && (
        <Container className="flex-grow animate-opacity-in lg:mt-4">
          <NotFoundMessage message="No events found" />
        </Container>
      )}
      {isLoading && (
        <Container className="flex-grow lg:mt-4">
          <Spinner />
        </Container>
      )}
      {!isLoading && nearestEvents && nearestEvents.length > 0 && (
        <Container
          className="grid-cols-event-cards grid flex-grow grid-flow-row 
          items-stretch gap-2 lg:mt-4"
        >
          {nearestEvents
            .sort((a, b) => dateCompare(a, b, sortByDate))
            .map((event) => {
              return (
                <NearEventCard
                  key={event.id}
                  eventId={event.id}
                  requiredParticipants={event.required_participants}
                  confirmedParticipants={event.confirmed_participants}
                  organizerAvatar={event.organizer_avatar}
                  organizerUsername={event.organizer_username}
                  date={getDate(event.date, currentLng)}
                  startTime={getStartingTime(event.date)}
                  duration={event.duration}
                  averageEventEvaluation={event.average_event_evaluation}
                  playgroundName={event.playground_name}
                  playgroundCity={event.playground_city}
                  price={event.price}
                  distance={distance}
                  latitude={currentLocalisation.latitude}
                  longitude={currentLocalisation.longitude}
                  country={currentCountry}
                />
              );
            })}
        </Container>
      )}
    </>
  );
}

export default FindEvents;
