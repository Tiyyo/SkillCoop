import FriendCard from '../../component/friend-card';
import type { Friend } from 'skillcoop-types';
import { useTranslation } from 'react-i18next';
import ErrorFallback from '../../component/error-fallback';
import SkeletonFallback from '../../component/skeleton-fallback';

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
        <div className="text-center italic text-xs py-4 text-light">
          {t('noFriendsFound')}.
        </div>
      ) : (
        <div
          className="grid grid-cols-2 py-8 gap-2 sm:flex 
          flex-wrap justify-start"
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
