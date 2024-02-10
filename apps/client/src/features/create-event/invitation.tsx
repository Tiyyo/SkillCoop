import { useApp } from '../../shared/store/app.store';
/*eslint-disable-next-line*/
import { useSearchResultOrDefault } from '../../hooks/useSearchResultOrDefault';
import Container from '../../shared/layouts/container';
import TitleH2 from '../../components/title-h2';
import SearchInput from '../../components/search-input';
import FriendCards from '../../components/friendcards-container';
import { useMutateEvent } from './store/create-event.store';
import { useTranslation } from 'react-i18next';

function InvitationFromCreateEventPage() {
  const { t } = useTranslation('title');
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
  } = useMutateEvent();

  return (
    <Container className="flex h-full flex-grow flex-col lg:mt-4 lg:rounded-lg">
      <TitleH2
        title={t('inviteYourFriends')}
        legend={t('inviteYourFriendsLegend')}
      />
      <div className="flex h-full flex-grow flex-col justify-between">
        <div className="flex flex-col justify-center gap-y-4 p-4">
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
