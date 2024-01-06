import SearchInput from '../../component/search-input';
import ProfileCard from '../../component/friend-card/profile';
import { useFriends } from '../../store/friend.store';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { useSearchProfile } from '../../hooks/useSearchProfile';
import { useSuggestProfile } from '../../hooks/useSuggestProfile';
import Container from '../../layout/container';
import { useTranslation } from 'react-i18next';

function AddFriends() {
  const { t } = useTranslation('title');
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { searchProfiles: suggestedOrSearched, pendingFriends } = useFriends();
  const { getInputSearchValue } = useSearchProfile({
    profileId,
  });
  useSuggestProfile({ profileId });

  const dataFilteredByPendingFriendIds = (
    item: { profile_id: number },
    pendingFriend: Record<string, any>[],
  ) => {
    const ids = pendingFriend.map((friend) => friend.adder_id);
    return !ids.includes(item.profile_id);
  };

  return (
    <>
      <Container className="w-full lg:mt-4">
        <TitleH2 title={t('addNew')} legend={t('addNewLegend')} />
      </Container>
      <Container className="flex-grow lg:mt-4">
        <div className="px-4 py-2">
          <SearchInput onChange={getInputSearchValue} />
        </div>
        <div
          className="grid py-2 justify-center"
          //  TODO: Move this into tailwind theme
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 2fr))',
          }}
        >
          {suggestedOrSearched &&
            suggestedOrSearched
              .filter((item) =>
                dataFilteredByPendingFriendIds(item, pendingFriends),
              )
              .map((profile) => (
                <ProfileCard
                  key={profile.profile_id}
                  avatar={profile.avatar_url}
                  username={profile.username}
                  friendId={profile.profile_id}
                  relation={profile.relation_exists}
                  profileId={profileId ?? 0}
                />
              ))}
        </div>
      </Container>
    </>
  );
}

export default AddFriends;
