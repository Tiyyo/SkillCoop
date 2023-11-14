import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getFriendsFn } from '../../api/api.fn';
import Friendlist from './list.friends';
import { useFriends } from '../../store/friend.store';
import { useEffect } from 'react';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';

function ConfirmedFriends() {
  // TODO implement infinite scroll
  const { userProfile } = useApp();
  const { addConfirmedFriends, confirmedFriends } = useFriends();
  const profileId = userProfile?.profile_id;
  const {
    data: friends,
    isLoading,
    isFetching,
    isError,
  } = useQuery(
    ['getFriends'],
    () => {
      if (!profileId) return;
      return getFriendsFn(profileId);
    },
    {
      enabled: true,
    },
  );
  const loading = isLoading || isFetching;

  useEffect(() => {
    if (!friends) return;
    addConfirmedFriends(friends);
  }, [friends]);

  return (
    <>
      <Link
        to="pending-request"
        className="text-end px-3 text-xs py-2 text-primary-900 underline-offset-4 underline transition-all duration-300 hover:text-primary-1100 cursor-pointer
      "
      >
        See pending request
      </Link>
      <TitleH2 value="My friends" />
      <Friendlist
        loading={loading}
        friends={confirmedFriends}
        error={isError}
        activeLinkProfile
      />
    </>
  );
}

export default ConfirmedFriends;
