import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdatePasswordDTO } from 'src/application/dto/update-password.dto';
import { RessourceNotFoundException } from 'src/application/exceptions/ressource-not-found.exception';
import { PasswordHashInterface } from 'src/application/services/hash.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

@Injectable()
export class UpdatePasswordUserUsecases {
  constructor(
    private readonly userAdapter: UserAdapter,
    @Inject('PasswordService')
    private readonly passwordService: PasswordHashInterface,
  ) { }
  async updatePassword(data: UpdatePasswordDTO) {
    const user = await this.userAdapter.findOne({ id: data.user_id });
    if (!user) {
      throw new RessourceNotFoundException(
        'Could not find user to update',
        'UpdatePasswordUserUsecases',
      );
    }
    const isPasswordValid = await this.passwordService.compare(
      data.old_password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Bad credentials');
    }
    const hashedPassword = await this.passwordService.hash(data.new_password);

    await this.userAdapter.updateOne(
      { id: data.user_id },
      { password: hashedPassword },
    );
  }
}
