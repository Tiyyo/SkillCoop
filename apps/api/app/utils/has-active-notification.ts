// determine in a array of ids which profile id has active_notification set ot 1
// and return an array of those ids
import { profile as Profile } from '../models/index';

export const hasActiveNotification = async (profileIds: number[]) => {
  const profileInfosInvitedUserQuery = profileIds.map((id) =>
    Profile.findByPk(id),
  );

  const profileInfos = await Promise.allSettled(profileInfosInvitedUserQuery);
  // filterMap with reduce
  const profileIdsWithNotificationOn = profileInfos.reduce(
    (acc: number[], curr) => {
      if (curr.status === 'fulfilled' && curr.value.active_notification === 1) {
        acc.push(curr.value.id);
      }
      return acc;
    },
    [],
  );
  return profileIdsWithNotificationOn.length > 0
    ? profileIdsWithNotificationOn
    : null;
};
