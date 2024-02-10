import FriendCard from '../../components/friend-card';
import type { Friend } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';
import ErrorFallback from '../../components/error-fallback';
import SkeletonFallback from '../../components/skeleton-fallback';
import NotFoundMessage from '../../shared/components/not-found-message';

type FriendlistProps = {
  friends?: Friend[];
  loading: boolean;
  error: boolean;
  stringKey?: string;
  activeLinkProfile?: boolean;
};

function Friendlist({
  friends,
  loading,
  error,
  stringKey,
  activeLinkProfile = false,
}: FriendlistProps) {
  const { t } = useTranslation('system');

  if (error) return <ErrorFallback />;
  if (loading) return <SkeletonFallback />;

  return (
    <>
      {friends?.length === 0 ? (
        <NotFoundMessage message={t('noFriendsFound')} />
      ) : (
        <div
          className="grid grid-cols-2 flex-wrap justify-start gap-2 
          py-8 sm:flex"
        >
          {friends?.map((friend) => (
            <FriendCard
              key={
                stringKey
                  ? friend[stringKey as keyof typeof friend]
                  : friend.friend_id
              }
              avatar={friend.avatar_url}
              username={friend.username}
              adderId={friend.adder_id}
              friendId={friend.friend_id}
              lastEvaluationRecorded={friend.last_evaluation}
              status={friend.status_name}
              activeLinkProfile={activeLinkProfile}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Friendlist;
