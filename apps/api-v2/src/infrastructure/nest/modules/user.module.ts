import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordUserUsecases } from 'src/application/usecases/user/forgot-password.user.usecases';
import { GetMeUserUsecases } from 'src/application/usecases/user/get-me.user.usecases';
import { ResetPasswordUserUsecases } from 'src/application/usecases/user/reset-password.user.usecases';
import { SendVerificationEmailUserUsecases } from 'src/application/usecases/user/send-email-verified.user.usecases';
import { UpdateEmailUserUsecases } from 'src/application/usecases/user/update-email.user.usecases';
import { UpdatePasswordUserUsecases } from 'src/application/usecases/user/update-password.use.usecases';
import { VerfiyEmailUserUsecases } from 'src/application/usecases/user/verify-email.user.usecases';
import { VerifyResetTokenUserIdUserUsecases } from 'src/application/usecases/user/verify-token-userid.user.usecases';
import { BuildProfileService } from 'src/domain/services/profile/find-profile.service';
import { UserAccountService } from 'src/domain/services/user/user-account.service';
import { VerifiedUserAccountService } from 'src/domain/services/user/verified-account.service';
import { ForgotPasswordUserController } from 'src/infrastructure/controllers/user/forgot-password.controller';
import { GetMeController } from 'src/infrastructure/controllers/user/get-me.controller';

import { RedirectToResetPasswordUserController } from 'src/infrastructure/controllers/user/redirect-reset-password.controller';

import { ResetPasswordUserController } from 'src/infrastructure/controllers/user/reset-password.controller';
import { SendVerificationEmailUserController } from 'src/infrastructure/controllers/user/send-verification-email.controller';
import { UpdateEmailUserController } from 'src/infrastructure/controllers/user/update-email.controller';
import { UpdatePasswordUserController } from 'src/infrastructure/controllers/user/update-password.controller';
import { VerifyEmailUserController } from 'src/infrastructure/controllers/user/verify-email.controller';
import { VerifyResetTokenhUserController } from 'src/infrastructure/controllers/user/verify-reset-token.controller';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { BcryptAdapterService } from 'src/infrastructure/service/bcrypt.adapter.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';
import { JwtAdapterService } from 'src/infrastructure/service/jwt-token.adapter.service';
import { NodeMaillerAdapterService } from 'src/infrastructure/service/nodemailer.adapter.service';

@Module({
  imports: [],
  controllers: [
    ForgotPasswordUserController,
    VerifyEmailUserController,
    VerifyResetTokenhUserController,
    ForgotPasswordUserController,
    RedirectToResetPasswordUserController,
    ResetPasswordUserController,
    SendVerificationEmailUserController,
    UpdateEmailUserController,
    UpdatePasswordUserController,
    GetMeController,
  ],
  providers: [
    databaseProvider,
    ForgotPasswordUserUsecases,
    VerifyResetTokenUserIdUserUsecases,
    VerfiyEmailUserUsecases,
    ResetPasswordUserUsecases,
    SendVerificationEmailUserUsecases,
    UpdateEmailUserUsecases,
    UpdatePasswordUserUsecases,
    GetMeUserUsecases,
    JwtService,
    NestEnvVariableAdapterService,
    VerifiedUserAccountService,
    BuildProfileService,
    UserAccountService,
    UserAdapter,
    ProfileAdapter,
    EventParticipantAdapter,
    EventQueriesAdapter,
    { provide: 'TokenService', useClass: JwtAdapterService },
    { provide: 'EmailService', useClass: NodeMaillerAdapterService },
    { provide: 'PasswordService', useClass: BcryptAdapterService },
  ],
})
export class UserModule { }
