import { Link } from 'react-router-dom';
import Friendlist from './list.friends';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { useConfirmedfriends } from '../../hooks/useConfirmedFriends';
import SubHeader from '../../component/header/sub-header';
import Container from '../../layout/container';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
        <div className="flex justify-between items-center">
          <TitleH2 />
          <Link
            to="pending-request"
            className="flex items-center gap-x-1 text-end 
            px-3 text-xs py-2 text-primary-100
            transition-all duration-300 font-medium
          hover:text-dark cursor-pointer"
          >
            {t('viewPendingRequest')}
            <ArrowRight size={16} />
          </Link>
        </div>
        <Friendlist
          loading={loading}
          friends={confirmedFriends}
          error={isError}
          activeLinkProfile
        />
      </Container>
    </>
  );
}

export default ConfirmedFriends;
