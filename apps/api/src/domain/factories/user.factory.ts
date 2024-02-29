import { GenericFactory } from '../shared/factory';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory extends GenericFactory {
  constructor() {
    super();
  }
  create(email: string, password: string) {
    const uuid = this.generateUUID();
    return new UserEntity(uuid, email, password);
  }
}
