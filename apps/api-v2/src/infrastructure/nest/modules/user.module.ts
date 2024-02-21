import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserUsecases } from 'src/application/usecases/user/register.user.usecases';
import { UserFactory } from 'src/domain/factories/user.factory';
import { ForgotPasswordUserController } from 'src/infrastructure/controllers/user/forgot-password.controller';
import { RegisterUserController } from 'src/infrastructure/controllers/user/register.controller';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { BcryptAdapterService } from 'src/infrastructure/service/bcrypt.adapter.service';
import { JwtAdapterService } from 'src/infrastructure/service/jwt-token.adapter.service';
import { NodeMaillerAdapterService } from 'src/infrastructure/service/nodemailer.adapter.service';

@Module({
  imports: [],
  controllers: [RegisterUserController, ForgotPasswordUserController],
  providers: [
    databaseProvider,
    JwtService,
    RegisterUserUsecases,
    UserFactory,
    UserAdapter,
    { provide: 'TokenService', useClass: JwtAdapterService },
    { provide: 'EmailService', useClass: NodeMaillerAdapterService },
    { provide: 'PasswordService', useClass: BcryptAdapterService },
  ],
})
export class UserModule { }
