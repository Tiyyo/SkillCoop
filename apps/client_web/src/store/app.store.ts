import { create } from 'zustand';
import { Profile } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getMeFn } from '../api/api.fn';
import { useEffect } from 'react';

interface AppStoreProps {
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

  const {
    data,
    isLoading: loading,
    isFetching,
    isSuccess,
  } = useQuery(['authUser'], () => getMeFn(), {
    enabled: true,
    cacheTime: 0,
    retry: 1,
  });

  useEffect(() => {
    if (isSuccess) {
      setProfile(data.userProfile);
    } else {
      setProfile(null);
    }
  }, [loading, isFetching]);

  useEffect(() => {
    if (userProfile) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userProfile]);

  return { userProfile, isAuth, loading, setIsAuth, setProfile, signout };
};
