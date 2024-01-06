import Friendlist from './list.friends';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { usePendingFriends } from '../../hooks/usePendingFriends';
import Container from '../../layout/container';
import { useTranslation } from 'react-i18next';

function PendingFriends() {
  const { t } = useTranslation('title');
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { pendingFriends, loading, isError } = usePendingFriends({ profileId });

  return (
    <Container className="w-full flex-grow flex flex-col lg:mt-4">
      <TitleH2 title={t('pendingRequest')} legend={t('pendingRequestLegend')} />
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
