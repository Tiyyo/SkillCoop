import { create } from 'zustand';
import { Profile } from '../types';
import { useEffect } from 'react';
import { useGetMe } from '../hooks/useProfile';
import useSubscriptionNotification from '../hooks/useSubscriptionNotification';

type AppStoreProps = {
  userProfile: Profile | null;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  setProfile: (userProfile: any) => void;
  signout: () => void;
}

const useAppStore = create<AppStoreProps>()((set) => ({
  userProfile: null,
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
  setProfile: (userProfile: any) => set({ userProfile }),
  signout: () => set({ isAuth: false, userProfile: null }),
}));

export const useApp = () => {
  const userProfile = useAppStore((state) => state.userProfile);
  const isAuth = useAppStore((state) => state.isAuth);
  const setIsAuth = useAppStore((state) => state.setIsAuth);
  const setProfile = useAppStore((state) => state.setProfile);
  const signout = useAppStore((state) => state.signout);

  const { data, isLoading, isFetching, isSuccess } = useGetMe({ userProfile });
  useSubscriptionNotification();

  useEffect(() => {
    if (data === 'Unecessary call') return;
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
    setIsAuth,
    setProfile,
    signout,
  };
};
