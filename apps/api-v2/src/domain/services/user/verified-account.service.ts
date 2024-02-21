import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

export class verifiedUserAccountService {
  constructor(private readonly userAdapter: UserAdapter) { }
  async makeVerified(userId: string) {
    await this.userAdapter.updateOne({ id: userId }, { verified: 1 });
  }
}
