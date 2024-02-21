import { Injectable } from '@nestjs/common';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

@Injectable()
export class UserAccountService {
  constructor(private readonly userAdapter: UserAdapter) { }
  async block(email: string) {
    const { failed_attempts, blocked } =
      await this.userAdapter.updateWithReturn({ email }, { blocked: true });
    return { failed_attempts, blocked };
  }
  async unblock(email: string) {
    const { failed_attempts, blocked } =
      await this.userAdapter.updateWithReturn({ email }, { blocked: false });
    return { failed_attempts, blocked };
  }
  async resetPassword(userId: string, password: string) {
    await this.userAdapter.updateWithReturn(
      { id: userId },
      { blocked: false, password, failed_attempts: 0 },
    );
  }
}
