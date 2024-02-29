import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(data: UserEntity): Promise<{ id: string; email: string }>;
  abstract updateWithReturn(
    condition: Partial<UserEntity>,
    data: Partial<UserEntity>,
  ): Promise<Partial<UserEntity>>;
}
