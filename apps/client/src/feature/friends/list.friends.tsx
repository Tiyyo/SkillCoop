import FriendCardSkeleton from '../../component/friend-card/skeleton';
import FriendCard from '../../component/friend-card';
import { Friend } from '../../types';

interface FriendlistProps {
  friends?: Friend[];
  loading: boolean;
  error: boolean;
  stringKey?: string;
  activeLinkProfile?: boolean;
}

function Friendlist({
  friends,
  loading,
  error,
  stringKey,
  activeLinkProfile = false,
}: FriendlistProps) {
  const NB_SKELETON = 14;

  //  TODO : handle error
  if (error) return <div>An expected error occurs</div>;

  if (loading)
    return (
      <div className="grid grid-cols-2 py-8 gap-2">
        {[...Array(NB_SKELETON)].map((_, i) => (
          <FriendCardSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <>
      {friends?.length === 0 ? (
        <div className="text-center italic text-xs py-4 text-light">
          No friends found.
        </div>
      ) : (
        <div className="grid grid-cols-2 py-8 gap-2 sm:flex flex-wrap justify-center">
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
