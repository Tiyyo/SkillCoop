/* eslint-disable max-len */
import SkeletonsLoader from '../../features/event/event-page/invitation/skeletons-loader';
import {
  CreateEventStateStore,
  useCreateEvent,
} from '../../stores/create-event.store';
import type { Friend } from '@skillcoop/types/src';
import FriendCard from '../friend-card';
import { useTranslation } from 'react-i18next';

type FriendCardProps = {
  profileSearchResult: Friend[] | undefined | null;
  addFriendToState?: (friendId: number) => void;
  removeFriendsToState?: (friendId: number) => void;
  loading: boolean;
  activeFilter?: boolean;
  dataFromState?: CreateEventStateStore | undefined | null;
};

function FriendCards({
  profileSearchResult,
  addFriendToState,
  removeFriendsToState,
  dataFromState,
  activeFilter = false,
  loading,
}: FriendCardProps) {
  const { t } = useTranslation('system');
  const { data: event } = useCreateEvent();

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
      className="my-2 grid max-w-7xl
     grid-cols-2 content-start  gap-2 py-8 sm:grid-cols-3 lg:grid-cols-4"
    >
      {profileSearchResult
        ?.filter((searchProfile) => {
          // if there is no need to filter pass this step
          if (!activeFilter) return true;
          // Compare friend of user with participant confirmed or invited to display only unrelated friends
          if (!event.participants) return true;
          return !event.participants.includes(searchProfile.friend_id);
        })
        .map((friend) => (
          <FriendCard
            key={friend.friend_id}
            avatar={friend.avatar_url}
            username={friend.username}
            adderId={friend.adder_id}
            friendId={friend.friend_id}
            status={friend.status_name}
            //@ts-ignore
            dataFromState={dataFromState}
            addFriendToState={addFriendToState}
            removeFriendFromState={removeFriendsToState}
            activeSelected
          />
        ))}
    </div>
  );
}

export default FriendCards;
