import SearchInput from '../../component/search-input';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSuggestProfileFn, searchProfileFn } from '../../api/api.fn';
import { SearchProfileQuery } from '../../types';
import ProfileCard from '../../component/friend-card/profile';
import { useFriends } from '../../store/friend.store';
import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';

function AddFriends() {
  const { userProfile } = useApp();
  const profiledId = userProfile?.profile_id;
  const { addSearchProfile, searchProfiles, pendingFriends } = useFriends();
  const [searchValue, setSearchValue] = useState<SearchProfileQuery>({
    username: '',
    page: 1,
    userProfileId: profiledId ?? 0,
  });

  const { data: suggestProfiles } = useQuery({
    queryKey: ['suggestProfiles'],
    queryFn: () => {
      if (!profiledId) return;
      return getSuggestProfileFn(profiledId);
    },
  });

  const {
    data: profiles,
    refetch: refetchProfiles,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['searchProfile'],
    queryFn: ({ signal }) => {
      if (!searchValue.username) return;
      return searchProfileFn(searchValue, signal);
    },
    enabled: false,
  });

  const loading = isLoading || isFetching;

  const dataFilteredByPendingFriendIds = (
    item: { profile_id: number },
    pendingFriend: Record<string, any>[]
  ) => {
    const ids = pendingFriend.map((friend) => friend.adder_id);
    return !ids.includes(item.profile_id);
  };

  const getInputSearchValue = (value: string) => {
    setSearchValue({ ...searchValue, username: value });
  };

  useEffect(() => {
    refetchProfiles();
  }, [searchValue]);

  useEffect(() => {
    if (!profiles) return;
    addSearchProfile(profiles);
  }, [profiles]);

  useEffect(() => {
    if (suggestProfiles) {
      addSearchProfile(suggestProfiles);
    }
  }, [suggestProfiles]);

  return (
    <>
      <ReturnBtn />
      <TitleH2 value="Add new contact to your friendlist" />
      <div className="px-4 py-2">
        <SearchInput onChange={getInputSearchValue} />
      </div>
      <div className="grid grid-cols-2 py-8 gap-2">
        {searchProfiles &&
          searchProfiles
            .filter((item) =>
              dataFilteredByPendingFriendIds(item, pendingFriends)
            )
            .map((profile) => (
              <ProfileCard
                key={profile.profile_id}
                avatar={profile.avatar_url}
                username={profile.username}
                friendId={profile.profile_id}
                relation={profile.relation_exists}
                profileId={profiledId ?? 0}
                refetch={refetchProfiles}
              />
            ))}
      </div>
    </>
  );
}

export default AddFriends;
