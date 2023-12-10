import Friendlist from './list.friends';
import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { usePendingFriends } from '../../hooks/usePendingFriends';
import Container from '../../layout/container';

function PendingFriends() {
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { pendingFriends, loading, isError } = usePendingFriends({ profileId });

  return (
    <Container className="w-full h-full flex flex-col lg:mt-4">
      <TitleH2
        title="Pending request"
        legend="An action is required from you"
      />
      <Friendlist
        loading={loading}
        friends={pendingFriends}
        error={isError}
        stringKey="adder_id"
        activeLinkProfile={false}
      />
    </Container>
  );
}

export default PendingFriends;
