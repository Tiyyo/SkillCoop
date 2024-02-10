import { useEvent } from '../store/event.store';
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
      <div className="py-12 text-center text-xs italic text-light">
        {t('noFriendsFound')}
      </div>
    );
  }

  return (
    <div
      className="mx-auto my-2 grid h-[55vh]
      max-w-7xl grid-cols-2 content-start gap-2 py-8 sm:grid-cols-3 
      lg:grid-cols-4"
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
