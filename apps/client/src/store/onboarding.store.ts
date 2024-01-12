import { create } from 'zustand';

type OnboardingStore = {
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  date_of_birth: string | null;
  location: string | null;
  avatar: string | null;
  setInputValue: (inputName: string, value: string) => void;
};

const useOnboardingStore = create<OnboardingStore>()((set) => ({
  username: null,
  firstname: null,
  lastname: null,
  date_of_birth: null,
  location: null,
  avatar: null,
  setInputValue: (inputName: string, value: string) =>
    set((state) => ({
      ...state,
      [inputName]: value,
    })),
}));

export const useOnboarding = () => {
  const setInputValue = useOnboardingStore((state) => state.setInputValue);
  const { username, firstname, lastname, date_of_birth, location, avatar } =
    useOnboardingStore((state) => state);
  return {
    setInputValue,
    username,
    firstname,
    lastname,
    date_of_birth,
    location,
    avatar,
  };
};
