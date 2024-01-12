import { create } from 'zustand';
import type { Profile } from '@skillcoop/types/src';
import { useEffect } from 'react';
import { useGetMe } from '../hooks/useProfile';
import { detectFirstAccess } from '../utils/is-first-connection';

type AppStoreProps = {
  userProfile: Profile | null;
  isAuth: boolean;
  isFristConnection: boolean | undefined;
  setIsAuth: (isAuth: boolean) => void;
  setProfile: (userProfile: any) => void;
  setIsFirstConnection: (isFristConnection: boolean | undefined) => void;
  signout: () => void;
};

const useAppStore = create<AppStoreProps>()((set) => ({
  userProfile: null,
  isAuth: false,
  isFristConnection: undefined,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
  setProfile: (userProfile: any) => set({ userProfile }),
  setIsFirstConnection: (isFristConnection: boolean | undefined) =>
    set({ isFristConnection }),
  signout: () =>
    set({ isAuth: false, userProfile: null, isFristConnection: undefined }),
}));

export const useApp = () => {
  const userProfile = useAppStore((state) => state.userProfile);
  const isAuth = useAppStore((state) => state.isAuth);
  const isFristConnection = useAppStore((state) => state.isFristConnection);
  const setIsAuth = useAppStore((state) => state.setIsAuth);
  const setProfile = useAppStore((state) => state.setProfile);
  const setIsFirstConnection = useAppStore(
    (state) => state.setIsFirstConnection,
  );
  const signout = useAppStore((state) => state.signout);

  const { data, isLoading, isFetching, isSuccess } = useGetMe({ userProfile });

  useEffect(() => {
    if (data === 'Unecessary call') return;
    console.log('data', data, detectFirstAccess(data));
    setIsFirstConnection(detectFirstAccess(data));
    if (isSuccess && data) {
      setProfile(data.userProfile);
    } else {
      setProfile(null);
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
    setIsAuth,
    setProfile,
    setIsFirstConnection,
    signout,
  };
};
