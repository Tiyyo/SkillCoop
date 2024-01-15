import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserModel } from 'src/database/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserModel],
})
export class ChatModule { }
