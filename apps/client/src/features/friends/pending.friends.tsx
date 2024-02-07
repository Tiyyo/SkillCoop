import Friendlist from './list.friends';
import TitleH2 from '../../components/title-h2';
import { useApp } from '../../stores/app.store';
import { usePendingFriends } from '../../hooks/usePendingFriends';
import Container from '../../layouts/container';
import { useTranslation } from 'react-i18next';

function PendingFriends() {
  const { t } = useTranslation('title');
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { pendingFriends, loading, isError } = usePendingFriends({ profileId });

  return (
    <Container className="flex w-full flex-grow flex-col lg:mt-4 lg:rounded-lg">
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
