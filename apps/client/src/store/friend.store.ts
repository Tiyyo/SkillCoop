import { create } from 'zustand';
import type { InvitationStatus, Profile } from '@skillcoop/types/src';

type Friend = {
  adder_id: number;
  friend_id: number;
  avatar_url: string;
  status_name: InvitationStatus;
  username: string;
};
type ConfirmedFriend = Friend[];
type PendingFriend = Friend[];
type Profiles = Profile[];
type FriendStoreProps = {
  confirmedFriends: ConfirmedFriend;
  pendingFriends: PendingFriend;
  searchProfiles: Profiles;
  addConfirmedFriends: (args: ConfirmedFriend) => void;
  addConfirmedFriend: (args: Friend) => void;
  addPendingFriend: (args: PendingFriend) => void;
  addSearchProfile: (args: Profiles) => void;
  removePendingFriend: (args: string) => void;
  removeSearchProfile: (args: string) => void;
  updateFriendStatus: (args: Friend) => void;
};

export const useFriendStore = create<FriendStoreProps>()((set) => ({
  confirmedFriends: [],
  pendingFriends: [],
  searchProfiles: [],
  addPendingFriend: (friends: PendingFriend) =>
    set((state) => ({
      ...state,
      pendingFriends: friends,
    })),
  addSearchProfile: (profiles: Profiles) =>
    set((state) => ({
      ...state,
      searchProfiles: profiles,
    })),
  addConfirmedFriends: (friends: ConfirmedFriend) =>
    set((state) => ({
      ...state,
      confirmedFriends: friends,
    })),
  addConfirmedFriend: (friend: Friend) =>
    set((state) => ({
      ...state,
      confirmedFriends: [...state.confirmedFriends, friend],
    })),
  removePendingFriend: (username: string) =>
    set((state) => ({
      ...state,
      pendingFriends: state.pendingFriends.filter(
        (pendingFriend) => pendingFriend.username !== username,
      ),
    })),
  removeSearchProfile: (username: string) =>
    set((state) => ({
      ...state,
      searchProfiles: state.searchProfiles.filter(
        (searchProfile) => searchProfile.username !== username,
      ),
    })),
  updateFriendStatus: (friend: Friend) =>
    set((state) => ({
      ...state,
      pendingFriends: state.pendingFriends.map((pendingFriend) => {
        if (pendingFriend.username === friend.username) {
          return { ...pendingFriend, status_name: friend.status_name };
        }
        return pendingFriend;
      }),
    })),
}));

export const useFriends = () => {
  const confirmedFriends = useFriendStore((state) => state.confirmedFriends);
  const pendingFriends = useFriendStore((state) => state.pendingFriends);
  const searchProfiles = useFriendStore((state) => state.searchProfiles);
  const addConfirmedFriend = useFriendStore(
    (state) => state.addConfirmedFriend,
  );
  const addConfirmedFriends = useFriendStore(
    (state) => state.addConfirmedFriends,
  );
  const addPendingFriend = useFriendStore((state) => state.addPendingFriend);
  const addSearchProfile = useFriendStore((state) => state.addSearchProfile);
  const removePendingFriend = useFriendStore(
    (state) => state.removePendingFriend,
  );
  const removeSearchProfile = useFriendStore(
    (state) => state.removeSearchProfile,
  );
  const updateFriendStatus = useFriendStore(
    (state) => state.updateFriendStatus,
  );

  return {
    confirmedFriends,
    pendingFriends,
    searchProfiles,
    addConfirmedFriend,
    addConfirmedFriends,
    addPendingFriend,
    addSearchProfile,
    removePendingFriend,
    removeSearchProfile,
    updateFriendStatus,
  };
};
