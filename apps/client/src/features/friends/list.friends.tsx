import FriendCard from '../../components/friend-card';
import type { Friend } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';
import ErrorFallback from '../../components/error-fallback';
import SkeletonFallback from '../../components/skeleton-fallback';

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
        <div className="py-20 text-center text-xs italic text-light">
          {t('noFriendsFound')}.
        </div>
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
