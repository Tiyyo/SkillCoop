import { useApp } from '../../../store/app.store';
import { useSearchResultOrDefault } from '../../../hooks/useSearchResultOrDefault';
import Container from '../../../layout/container';
import TitleH2 from '../../../component/title-h2';
import SearchInput from '../../../component/search-input';
import FriendCards from '../../../component/friendcards-container';
import { useCreateEvent } from '../../../store/create-event.store';

function InvitationFromCreateEventPage() {
  const { userProfile } = useApp();
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
            activeFilter
          />
        </div>
      </div>
    </Container>
  );
}

export default InvitationFromCreateEventPage;
