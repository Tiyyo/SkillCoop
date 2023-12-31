import { useEvent } from '../../../../store/event.store';
import { Friend } from '@skillcoop/types/src';
import SearchProfileCard from './search-profile-card';
import SkeletonsLoader from './skeletons-loader';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

type SearchFriendResultProps = {
  profileSearchResult?: Friend[] | null;
  loading: boolean;
};

function SearchResult({
  profileSearchResult,
  loading = true,
}: SearchFriendResultProps) {
  const { t } = useTranslation('system');
  const { data: eventState } = useEvent();

  if (loading) {
    return <SkeletonsLoader nbSkeleton={10} />;
  }

  if (!profileSearchResult) {
    return (
      <div className="text-center italic text-xs py-12 text-light">
        {t('noFriendsFound')}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
     py-8 gap-2 my-2 h-[55vh] content-start max-w-7xl mx-auto"
    >
      <Suspense fallback="coucou">
        {profileSearchResult
          .filter((searchProfile) => {
            if (!eventState?.participants) return true;
            return !eventState?.participants
              .map((p) => p.profile_id)
              .includes(searchProfile.friend_id);
          })
          .map((friend) => (
            <SearchProfileCard
              key={friend.friend_id}
              avatar={friend.avatar_url}
              username={friend.username}
              friendId={friend.friend_id}
              lastEvaluationRecorded={friend.last_evaluation}
            />
          ))}
      </Suspense>
    </div>
  );
}

export default SearchResult;
