import Friendlist from './list.friends';
import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { usePendingFriends } from '../../hooks/usePendingFriends';

function PendingFriends() {
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { pendingFriends, loading, isError } = usePendingFriends({ profileId });

  return (
    <>
      <ReturnBtn to="/contact" />
      <TitleH2 value="Pending request" />
      <Friendlist
        loading={loading}
        friends={pendingFriends}
        error={isError}
        stringKey="adder_id"
        activeLinkProfile={false}
      />
    </>
  );
}

export default PendingFriends;
