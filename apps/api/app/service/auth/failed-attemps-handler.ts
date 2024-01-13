import { getUTCString, getInterval } from '@skillcoop/date-handler';
import { user as UserModel } from '../../models/index.js';
import { User as TUser } from '@skillcoop/types';

export class FailedAttempsHandler {
  user: TUser;
  attemptResetInterval: number = 1000 * 60 * 60 * 24;

  constructor(user: TUser) {
    this.user = user;
  }

  private resetAttemptEligibilityCheck(): boolean {
    const today = getUTCString(new Date());
    const lastUpdated = this.user.updated_at;
    if (!lastUpdated) return false;
    const interval = getInterval(today, lastUpdated);
    return interval > this.attemptResetInterval && this.user.blocked === 0;
  }
  async getTrack() {
    const shouldResetAttempsCount = this.resetAttemptEligibilityCheck();
    if (shouldResetAttempsCount) {
      UserModel.resetFailedLoginAttempts(this.user.email);
    }
    if (this.user?.failed_attempts < 4) {
      return await UserModel.increaseFailedLoginAttempts(this.user.email);
    } else {
      await UserModel.increaseFailedLoginAttempts(this.user.email);
      return await UserModel.blockUserAccount(this.user.email);
    }
  }
}
