import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ProfileModule } from './infrastructure/nest/modules/profile.module';
import { UserModule } from './infrastructure/nest/modules/user.module';
import { AuthModule } from './infrastructure/nest/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
