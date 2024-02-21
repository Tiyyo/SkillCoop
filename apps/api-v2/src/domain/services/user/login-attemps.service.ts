import { Injectable } from '@nestjs/common';
import { DateProvider } from '../date.provider.service';
import { UserDBEntity } from 'src/domain/entities/user.entity';
import { UserAccountService } from './user-account.service';
import { LoginAttempsCounterService } from './login-attempts-counter.service';

@Injectable()
export class UserLoginAttemptsService {
  attemptResetInterval: number = 1000 * 60 * 60 * 24;

  constructor(
    private readonly dateProvider: DateProvider,
    private readonly userAccount: UserAccountService,
    private readonly loginAttemptsCounter: LoginAttempsCounterService,
  ) { }

  private resetAttemptEligibilityCheck(user: UserDBEntity): boolean {
    if (!user.updated_at) return false;
    const interval = this.dateProvider.intervalFromToday(user.updated_at);
    return interval > this.attemptResetInterval && user.blocked === 0;
  }

  async handleFailedAttemp(user: UserDBEntity) {
    const shouldResetAttempsCount = this.resetAttemptEligibilityCheck(user);

    if (shouldResetAttempsCount) {
      this.loginAttemptsCounter.resetCounter(user.email);
    }
    if (user.failed_attempts === 4) {
      await this.loginAttemptsCounter.increase(user.email);
      return await this.userAccount.block(user.email);
    }
    return await this.loginAttemptsCounter.increase(user.email);
  }
}
