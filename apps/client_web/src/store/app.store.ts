import { create } from "zustand";
import { Profile } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getMeFn } from "../api/api.fn";
import { useEffect } from "react";

interface AppStoreProps {
  userProfile: Profile | null;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  setProfile: (userProfile: any) => void;
}


const useAppStore = create<AppStoreProps>()((set) => ({
  userProfile: null,
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
  setProfile: (userProfile: any) => set({ userProfile }),
}))

export const useApp = () => {
  const userProfile = useAppStore((state) => state.userProfile);
  const isAuth = useAppStore((state) => state.isAuth);
  const setIsAuth = useAppStore((state) => state.setIsAuth);
  const setProfile = useAppStore((state) => state.setProfile);

  const { data, isError, isLoading, isFetching } = useQuery(
    ['authUser'],
    () => getMeFn(),
    {
      enabled: true,
      retry: false,
    }
  );

  const loading = isLoading || isFetching;

  console.log("is there remaining data :", data);

  useEffect(() => {
    console.log('There is data :', data);
    console.log('There is userProfile :', data?.userProfile)
    if (data && data.userProfile) {
      setProfile(data.userProfile)
      setIsAuth(true)
    } else {
      setProfile(null)
      setIsAuth(false)
    }
  }, [data, isError, loading])


  return { userProfile, isAuth, loading, setIsAuth, setProfile };
}
