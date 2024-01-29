import { Link } from 'react-router-dom';
import Friendlist from './list.friends';
import TitleH2 from '../../components/title-h2';
import { useApp } from '../../stores/app.store';
import { useConfirmedfriends } from '../../hooks/useConfirmedFriends';
import SubHeader from '../../components/header/sub-header';
import Container from '../../layouts/container';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import SkeletonFallback from '../../components/skeleton-fallback';

function ConfirmedFriends() {
  // TODO implement infinite scroll
  const { t } = useTranslation('title');
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { confirmedFriends, loading, isError } = useConfirmedfriends({
    profileId,
  });

  return (
    <>
      <SubHeader
        title={t('myFriends')}
        isPlusExist={true}
        linkFromPlus="add"
        textButton={t('addNewFriend')}
        legend={t('myFriendsLegend')}
      />
      <Container className="flex-grow">
        <div className="flex items-center justify-between">
          <TitleH2 />
          <Link
            to="pending-request"
            className="flex cursor-pointer items-center gap-x-1 
            px-3 py-2 text-end text-xs
            font-medium text-primary-100 transition-all
          duration-300 hover:text-dark"
          >
            {t('viewPendingRequest')}
            <ArrowRight size={16} />
          </Link>
        </div>
        <Suspense fallback={<SkeletonFallback />}>
          <Friendlist
            loading={loading}
            friends={confirmedFriends}
            error={isError}
            activeLinkProfile
          />
        </Suspense>
      </Container>
    </>
  );
}

export default ConfirmedFriends;
