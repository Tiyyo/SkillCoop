import Container from '../../shared/layouts/container';
import useCreateEvent from './hooks/useCreateEvent';
import CreateEventForm from './form';
import HeaderCreateEvent from './header';

function CreateEvent() {
  const {
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
    updatePrice,
    updateVisibility,
    validationErrors,
  } = useCreateEvent();

  return (
    <Container className=" h-full flex-grow pb-10 lg:mt-4 lg:rounded-lg">
      <HeaderCreateEvent />
      <CreateEventForm
        handleFormSubmit={handleFormSubmit}
        createEventFormRef={createEventFormRef}
        eventCreatedState={eventCreatedState}
        inputHasError={inputHasError}
        isLoading={isLoading}
        updateDuration={updateDuration}
        updateLocation={updateLocation}
        updateStartDate={updateStartDate}
        updateStartTime={updateStartTime}
        updateRequiredParticipants={updateRequiredParticipants}
        updatePrice={updatePrice}
        updateVisibility={updateVisibility}
        validationErrors={validationErrors}
      />
    </Container>
  );
}

export default CreateEvent;
