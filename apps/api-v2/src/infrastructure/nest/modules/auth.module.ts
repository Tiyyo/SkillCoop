import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocialAuthUserStrategyService } from 'src/application/services/social-strategy.service';
import { GoogleAuthUsecases } from 'src/application/usecases/google/google-auth.usecasses';
import { LoginUserUsecases } from 'src/application/usecases/user/login.user.usecases';
import { RefreshUserUsecases } from 'src/application/usecases/user/refresh.user.usecases';
import { RegisterUserUsecases } from 'src/application/usecases/user/register.user.usecases';
import { UserFactory } from 'src/domain/factories/user.factory';
import { DateProvider } from 'src/domain/services/date.provider.service';
import { LanguagePreferenceService } from 'src/domain/services/user-prefrerences/language-preference.service';
import { NotificationPreferenceService } from 'src/domain/services/user-prefrerences/notification-preference.service';
import { ThemePreferenceService } from 'src/domain/services/user-prefrerences/theme-preference.service';
import { UserPreferencesService } from 'src/domain/services/user-prefrerences/user-preferences.service';
import { UserLoginAttemptsService } from 'src/domain/services/user/login-attemps.service';
import { LoginAttempsCounterService } from 'src/domain/services/user/login-attempts-counter.service';
import { UserAccountService } from 'src/domain/services/user/user-account.service';
import { UserCredentialsValidatorService } from 'src/domain/services/user/user-credentials-validator.service';
import { GoogleAuthController } from 'src/infrastructure/controllers/auth/google-auth.controller';
import { LoginDemoUserController } from 'src/infrastructure/controllers/auth/login-demo.controller';
import { LoginUserController } from 'src/infrastructure/controllers/auth/login.controller';
import { LogoutUserController } from 'src/infrastructure/controllers/auth/logout.controller';
import { RefreshUserController } from 'src/infrastructure/controllers/auth/refresh.controller';
import { RegisterUserController } from 'src/infrastructure/controllers/auth/register.controller';
import { LanguagePreferenceAdapter } from 'src/infrastructure/kysely/adapters/language-preference.adapter';
import { NotificationPreferenceAdapter } from 'src/infrastructure/kysely/adapters/notification-preference.adapter';
import { NotificationTypeAdapter } from 'src/infrastructure/kysely/adapters/notification-type.adapter';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { ThemePreferenceAdapter } from 'src/infrastructure/kysely/adapters/theme-preference.adapter';
import { UserPreferencesAdapter } from 'src/infrastructure/kysely/adapters/user-preferences.adapter';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { BcryptAdapterService } from 'src/infrastructure/service/bcrypt.adapter.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';
import { EventEmitterService } from 'src/infrastructure/service/event.emitter.service';
import { GoogleOAuthService } from 'src/infrastructure/service/google-oauth.service';
import { JwtAdapterService } from 'src/infrastructure/service/jwt-token.adapter.service';
import { NodeMaillerAdapterService } from 'src/infrastructure/service/nodemailer.adapter.service';

@Module({
  imports: [],
  controllers: [
    GoogleAuthController,
    LoginDemoUserController,
    LoginUserController,
    LogoutUserController,
    RefreshUserController,
    RegisterUserController,
  ],
  providers: [
    databaseProvider,
    UserFactory,
    JwtService,
    UserAdapter,
    GoogleAuthUsecases,
    LoginUserUsecases,
    RefreshUserUsecases,
    RegisterUserUsecases,
    ProfileAdapter,
    UserPreferencesAdapter,
    NotificationPreferenceAdapter,
    NotificationTypeAdapter,
    ThemePreferenceAdapter,
    LanguagePreferenceAdapter,
    UserCredentialsValidatorService,
    SocialAuthUserStrategyService,
    NestEnvVariableAdapterService,
    UserLoginAttemptsService,
    UserAccountService,
    LoginAttempsCounterService,
    UserPreferencesService,
    NotificationPreferenceService,
    LanguagePreferenceService,
    ThemePreferenceService,
    DateProvider,
    { provide: 'TokenService', useClass: JwtAdapterService },
    { provide: 'SocialAuthService', useClass: GoogleOAuthService },
    { provide: 'EmailService', useClass: NodeMaillerAdapterService },
    { provide: 'PasswordService', useClass: BcryptAdapterService },
    { provide: 'EmitEventService', useClass: EventEmitterService },
  ],
})
export class AuthModule { }
