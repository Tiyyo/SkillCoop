import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { inviteParticipantSchema } from 'schema/ts-schema';
import { useApp } from '../../../store/app.store';
import { useEvent } from '../../../store/event.store';
import { useSearchResultOrDefault } from '../../../hooks/useSearchResultOrDefault';
import Container from '../../../layout/container';
import TitleH2 from '../../../component/title-h2';
import SearchInput from '../../../component/search-input';
import SwitchMutateOrUpdate from '../../../component/invite/index.switch';
import FriendCards from '../../../component/invite/index.friends';
import { useCreateEvent } from '../../../store/create-event.store';

// One component gonna update a state in store and will manage the mutation
// The other gonna mutate data directyl without storing data in a store
function InvitationFromCreateEventPage() {
  const navigate = useNavigate();
  const { userProfile } = useApp();
  const { data: eventState } = useEvent();
  const location = useLocation();
  const [eventId, setEventId] = useState<number | undefined>(undefined);
  const profileId = userProfile?.profile_id;

  const {
    getSearchValue,
    data: profileSearchResult,
    loading,
  } = useSearchResultOrDefault({
    profileId,
  });

  const {
    addInvitedParticipantsIds,
    removeInvitedParticipantsIds,
    data: dataFromState,
  } = useCreateEvent();

  useEffect(() => {
    setEventId(location.state?.eventId);
  }, []);

  return (
    <Container className="lg:mt-4 h-full flex-grow flex flex-col">
      <TitleH2
        title="Invite your friends"
        legend="Select the friends you'd like to invite to join this event."
      />
      <div className="flex-grow flex flex-col justify-between h-full">
        <div className="px-4 flex flex-col justify-center">
          <SearchInput onChange={getSearchValue} />
          <FriendCards
            profileSearchResult={profileSearchResult}
            dataFromState={dataFromState}
            addFriendToState={addInvitedParticipantsIds}
            removeFriendsToState={removeInvitedParticipantsIds}
            loading={loading}
          />
        </div>
      </div>
    </Container>
  );
}

export default InvitationFromCreateEventPage;
