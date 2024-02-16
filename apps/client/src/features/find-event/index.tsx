import { useEffect } from 'react';
import TitleH2 from '../../shared/components/title-h2';
import Container from '../../shared/layouts/container';
import { useApp } from '../../shared/store/app.store';

//https://api.mapbox.com/geocoding/v5/{endpoint}/{longitude},{latitude}.json

function FindEvents() {
  const { userProfile } = useApp();
  if (userProfile && !userProfile.location) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }
  console.log(userProfile);
  useEffect(() => {
    // ask for location
  }, []);
  return (
    <>
      <Container className="lg:mt-4">
        <div className="flex items-center justify-between">
          <TitleH2
            title="Find events"
            legend="Find all events that need player in your aera"
          />
          <div className="flex">
            <div>distance</div>
            <div>Level</div>
            <div>date</div>
          </div>
        </div>
      </Container>
      <Container className="lg:mt-4">
        <div>Events</div>
      </Container>
    </>
  );
}

export default FindEvents;
