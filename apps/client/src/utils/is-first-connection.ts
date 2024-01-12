import { Profile } from 'packages/types/src';

export function detectFirstAccess(
  responseQuery: 'Unecessary call' | { userProfile: Profile } | undefined,
) {
  if (!responseQuery) return undefined;
  if (responseQuery === 'Unecessary call') return undefined;
  if (!responseQuery.userProfile) return undefined;
  if (responseQuery.userProfile.username) {
    return false;
  } else {
    return true;
  }
}
