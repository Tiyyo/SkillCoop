import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ProfileModule } from './infrastructure/nest/modules/profile.module';
import { UserModule } from './infrastructure/nest/modules/user.module';
import { AuthModule } from './infrastructure/nest/modules/auth.module';
import { AwardModule } from './infrastructure/nest/modules/award.module';
import { NotificationModule } from './infrastructure/nest/modules/notification.module';
import { UserPreferencesModule } from './infrastructure/nest/modules/user-preference.module';
import { SkillsModule } from './infrastructure/nest/modules/skills.module';
import { EventQueriesModule } from './infrastructure/nest/modules/event-queries.module';
import { PlaygroundModule } from './infrastructure/nest/modules/playground.module';
import { FriendModule } from './infrastructure/nest/modules/friends.module';
import { EventParticipantsModule } from './infrastructure/nest/modules/event-participants.module';
import { EventMutationsModule } from './infrastructure/nest/modules/event-mutations.module';
import { TeamsModule } from './infrastructure/nest/modules/teams.module';
import { VitestModule } from './vitest-test/vitest.module';
import { AuthMiddleware } from './infrastructure/nest/middleware/auth.middleware';
import { JwtAdapterService } from './infrastructure/service/jwt-token.adapter.service';
import { NestEnvVariableAdapterService } from './infrastructure/service/env.adapter.service';
import { JwtService } from '@nestjs/jwt';
import { SanitizeMiddleware } from './infrastructure/nest/middleware/sanitize.middleware';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ListenerModule } from './infrastructure/nest/modules/listener.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({
      wildcard: false,
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    ProfileModule,
    UserModule,
    AuthModule,
    AwardModule,
    NotificationModule,
    UserPreferencesModule,
    PlaygroundModule,
    SkillsModule,
    EventQueriesModule,
    EventMutationsModule,
    FriendModule,
    EventParticipantsModule,
    TeamsModule,
    VitestModule,
    ListenerModule,
  ],
  controllers: [],
  providers: [
    AppService,
    { provide: 'TokenService', useClass: JwtAdapterService },
    NestEnvVariableAdapterService,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SanitizeMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/demo', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/logout', method: RequestMethod.POST },
        { path: '/auth/refresh', method: RequestMethod.GET },
        { path: '/auth/register', method: RequestMethod.POST },
        { path: '/auth/google/callback', method: RequestMethod.GET },
        { path: '/user/me', method: RequestMethod.GET },
        { path: '/user/forgot-password', method: RequestMethod.POST },
        { path: '/user/reset-password', method: RequestMethod.ALL },
        { path: '/user/forgot-password', method: RequestMethod.POST },
        { path: '/user/reset-password', method: RequestMethod.POST },
        {
          path: '/user/:userId/reset-password/:token',
          method: RequestMethod.GET,
        },
        { path: '/user/email', method: RequestMethod.POST },
        { path: '/user/:userId/verify/:token', method: RequestMethod.GET },
        { path: 'test', method: RequestMethod.ALL },
        { path: 'subscription-event', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
