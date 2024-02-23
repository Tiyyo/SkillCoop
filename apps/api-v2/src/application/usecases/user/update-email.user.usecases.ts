import { Injectable } from '@nestjs/common';
import { UpdateEmailDTO } from 'src/application/dto/update-email.dto';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

@Injectable()
export class UpdateEmailUserUsecases {
  constructor(private readonly userAdapter: UserAdapter) { }

  async updateEmail(body: UpdateEmailDTO) {
    const hasUpdated = await this.userAdapter.updateOne(
      { id: body.user_id },
      { email: body.email },
    );
    return hasUpdated;
  }
}
