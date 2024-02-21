import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProfileModule } from './infrastructure/nest/modules/profile.module';
import { UserModule } from './infrastructure/nest/modules/user.module';
import { GoogleModule } from './infrastructure/nest/modules/google.module';

@Module({
  imports: [ProfileModule, UserModule, GoogleModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
