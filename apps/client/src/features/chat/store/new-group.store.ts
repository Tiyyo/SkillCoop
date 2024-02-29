import { FriendStoreChat } from 'packages/types/src';
import { create } from 'zustand';

type NewConversationGroupStoreProps = {
  friends: FriendStoreChat[];
  addFriends: (friend: FriendStoreChat) => void;
  removeFriends: (id: string) => void;
  cleanFriends: () => void;
};

export const useNewConversationGroupStore =
  create<NewConversationGroupStoreProps>((set) => ({
    friends: [],
    cleanFriends: () => set((state) => ({ ...state, friends: [] })),
    addFriends: (friend) =>
      set((state) => ({
        ...state,
        friends: [...state.friends, friend],
      })),
    removeFriends: (id) =>
      set((state) => ({
        ...state,
        friends: state.friends.filter((friend) => friend.userId !== id),
      })),
  }));

export const useNewConversationGroup = () => {
  const { friends, addFriends, removeFriends, cleanFriends } =
    useNewConversationGroupStore((state) => state);
  return { friends, addFriends, removeFriends, cleanFriends };
};
