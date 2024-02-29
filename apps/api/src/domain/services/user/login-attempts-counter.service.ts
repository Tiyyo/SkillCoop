import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainException } from 'src/domain/shared/domain-exception';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

@Injectable()
export class LoginAttempsCounterService {
  constructor(private readonly userAdapter: UserAdapter) {}

  async resetCounter(email: string) {
    await this.userAdapter.updateOne({ email }, { failed_attempts: 0 });
  }

  async increase(email: string) {
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
