import { create } from 'zustand';
import type { Profile } from '@skillcoop/types/src';
import { useEffect } from 'react';
import { useGetMe } from '../hooks/useProfile';
import { detectFirstAccess } from '../../utils/is-first-connection';

type AppStoreProps = {
  userProfile: Profile | null;
  isAuth: boolean;
  isFristConnection: boolean | undefined;
  userId: number | null;
  setUserId: (userid: number | null) => void;
  setIsAuth: (isAuth: boolean) => void;
  setProfile: (userProfile: any) => void;
  setIsFirstConnection: (isFristConnection: boolean | undefined) => void;
  signout: () => void;
};

const useAppStore = create<AppStoreProps>()((set) => ({
  userProfile: null,
  isAuth: false,
  isFristConnection: undefined,
  userId: null,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
  setProfile: (userProfile: any) => set({ userProfile }),
  setUserId: (userId: number | null) => set({ userId }),
  setIsFirstConnection: (isFristConnection: boolean | undefined) =>
    set({ isFristConnection }),
  signout: () =>
    set({ isAuth: false, userProfile: null, isFristConnection: undefined }),
}));

export const useApp = () => {
  const userProfile = useAppStore((state) => state.userProfile);
  const isAuth = useAppStore((state) => state.isAuth);
  const isFristConnection = useAppStore((state) => state.isFristConnection);
  const userId = useAppStore((state) => state.userId);
  const setIsAuth = useAppStore((state) => state.setIsAuth);
  const setProfile = useAppStore((state) => state.setProfile);
  const setUserId = useAppStore((state) => state.setUserId);
  const setIsFirstConnection = useAppStore(
    (state) => state.setIsFirstConnection,
  );
  const signout = useAppStore((state) => state.signout);

  const { data, isLoading, isFetching, isSuccess } = useGetMe({ userProfile });

  useEffect(() => {
    if (data === 'Unecessary call') return;
    setIsFirstConnection(detectFirstAccess(data));
    if (isSuccess && data && data.userProfile) {
      setUserId(data.userId);
      setProfile(data.userProfile);
    } else {
      setProfile(null);
      setUserId(null);
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (userProfile) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userProfile]);

  return {
    userProfile,
    isAuth,
    loading: isLoading,
    isFristConnection,
    userId,
    setUserId,
    setIsAuth,
    setProfile,
    setIsFirstConnection,
    signout,
  };
};
