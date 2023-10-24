import { create } from 'zustand';
import { Profile } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getMeFn } from '../api/api.fn';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const userProfile = useAppStore((state) => state.userProfile);
  const isAuth = useAppStore((state) => state.isAuth);
  const setIsAuth = useAppStore((state) => state.setIsAuth);
  const setProfile = useAppStore((state) => state.setProfile);
  const signout = useAppStore((state) => state.signout);

  const {
    data,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    error,
    isPreviousData,
    status,
  } = useQuery(['authUser'], () => getMeFn(), {
    enabled: true,
    cacheTime: 0,
    retry: 1,
  });

  // const loading = isLoading || isFetching;

  // const getUserInfo = async () => {
  //   const data = await getMeFn()
  //   setProfile(data.userProfile)
  //   console.log('data without useQuery hook:', data);
  //   return data
  // }

  // useEffect(() => {
  //   console.log('getUserInfo is called');
  //   getUserInfo()
  // }, [])

  useEffect(() => {
    console.log('Status from useQuery : ', status);
    console.log('isPreviousData from useQuery : ', isPreviousData);
    if (isSuccess) {
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
    console.log(isAuth);
  }, [userProfile]);

  console.log('Data from getMe query : ', data);
  console.log('App store data user : ', userProfile);

  // useEffect(() => {
  //   console.log('user get me :', data);
  //   // if (error) {
  //   //   setIsAuth(false)
  //   // }
  //   // if (data && data.userProfile) {
  //   //   // setProfile(data.userProfile)
  //   //   setIsAuth(true)
  //   // } else {
  //   //   // setProfile(null)
  //   //   setIsAuth(false)
  //   // }
  //   console.log('Status auth : ', isAuth);
  // }, [data, isError, loading, setIsAuth, setProfile, error])

  return { userProfile, isAuth, setIsAuth, setProfile, signout };
};
