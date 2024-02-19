import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(data: UserEntity): Promise<{ id: string; email: string }>;
}
