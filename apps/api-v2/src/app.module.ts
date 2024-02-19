import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProfileModule } from './infrastructure/nest/modules/profile.module';
import { UserModule } from './infrastructure/nest/modules/user.module';

@Module({
  imports: [ProfileModule, UserModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
