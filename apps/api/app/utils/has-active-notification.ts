// determine in a array of ids which profile id has active_notification set ot 1
// and return an array of those ids
import { profile as Profile } from '#models';

export const hasActiveNotification = async (profileIds: number[]) => {
  const profileInfosInvitedUserQuery = profileIds.map((id) =>
    Profile.findOne({ profile_id: id }),
  );
  const profileInfos = await Promise.allSettled(profileInfosInvitedUserQuery);
  // filterMap with reduce
  const profileIdsWithNotificationOn = profileInfos.reduce(
    (acc: number[], curr) => {
      if (
        curr.status === 'fulfilled' &&
        curr.value &&
        curr.value.active_notification === 1
      ) {
        acc.push(curr.value.profile_id);
      }
      return acc;
    },
    [],
  );

  return profileIdsWithNotificationOn.length > 0
    ? profileIdsWithNotificationOn
    : null;
};
