import { NotFoundException } from '@nestjs/common';
import { DomainException } from 'src/domain/shared/domain-exception';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

export class BlockUserAccountService {
  constructor(private readonly userAdapter: UserAdapter) { }
  async blockUserAccount(email: string) {
    const { failed_attempts, blocked } =
      await this.userAdapter.updateWithReturn({ email }, { blocked: true });
    return { failed_attempts, blocked };
  }
}

export class IncreaseFailedLoginAttemptsService {
  constructor(private readonly userAdapter: UserAdapter) { }
  async increaseFailedLoginAttempts(email: string) {
    const user = await this.userAdapter.findOne({ email });
    if (!user) throw new NotFoundException('User not found');
    const { failed_attempts } = await this.userAdapter.updateWithReturn(
      { email },
      { failed_attempts: user.failed_attempts + 1 },
    );
    const userUpdated = await this.userAdapter.findOne({ email });
    if (failed_attempts !== user.failed_attempts + 1) {
      throw new DomainException(
        'Failed to update failed attempts',
        'IncreaseFailedLoginAttemptsService',
      );
    }
    return userUpdated;
  }
}

export class ResetLoginAttempsService {
  constructor(private readonly userAdapter: UserAdapter) { }
  async resetFailedLoginAttempt(email: string) {
    await this.userAdapter.updateOne({ email }, { failed_attempts: 0 });
  }
}
