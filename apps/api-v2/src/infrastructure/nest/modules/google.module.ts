import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthController } from 'src/infrastructure/controllers/google/google-auth.controller';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { GoogleOAuthService } from 'src/infrastructure/service/google-oauth.service';
import { JwtAdapterService } from 'src/infrastructure/service/jwt-token.adapter.service';

@Module({
  imports: [],
  controllers: [GoogleAuthController],
  providers: [
    databaseProvider,
    JwtService,
    UserAdapter,
    { provide: 'TokenService', useClass: JwtAdapterService },
    { provide: 'SocialAuthService', useClass: GoogleOAuthService },
  ],
})
export class GoogleModule { }
