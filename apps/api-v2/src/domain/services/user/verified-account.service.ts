import { Injectable } from '@nestjs/common';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

@Injectable()
export class VerifiedUserAccountService {
  constructor(private readonly userAdapter: UserAdapter) { }
  async makeVerified(userId: string) {
    await this.userAdapter.updateOne({ id: userId }, { verified: 1 });
  }
}
