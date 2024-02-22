import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ProfileModule } from './infrastructure/nest/modules/profile.module';
import { UserModule } from './infrastructure/nest/modules/user.module';
import { AuthModule } from './infrastructure/nest/modules/auth.module';
import { AwardModule } from './infrastructure/nest/modules/award.module';
import { NotificationModule } from './infrastructure/nest/modules/notification.module';
import { UserPreferencesModule } from './infrastructure/nest/modules/user-preference.module';
import { SkillsModule } from './infrastructure/nest/modules/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    UserModule,
    AuthModule,
    AwardModule,
    NotificationModule,
    UserPreferencesModule,
    SkillsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
