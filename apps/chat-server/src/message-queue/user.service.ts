import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UserModel } from 'src/database/user.service';

@Injectable()
export class UserService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly userModel: UserModel,
  ) { }
}
