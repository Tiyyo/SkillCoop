import { FriendEntity } from '../entities/friend.entity';

export abstract class FriendRepository {
  abstract findFriends(profileId: string): Promise<FriendEntity[]>;
  abstract searchFriends(
    profileId: string,
    query: string,
    page: number,
  ): Promise<FriendEntity[]>;
  abstract findRelation(profileId: string, withId: string): Promise<boolean>;
  abstract updateStatus(
    from: string,
    to: string,
    status: string,
  ): Promise<void>;
  abstract findPendingRequests(profileId: string): Promise<FriendEntity[]>;
  abstract getSuggestedFriends(profileId: string): Promise<
    {
      friend_id: number;
      username: string;
      avatar_url: string | null;
      last_evaluation: number | null;
    }[]
  >;
}
