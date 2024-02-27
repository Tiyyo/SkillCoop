import { Inject } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { GoogleAuthException } from 'src/application/exceptions/google-auth.exception';
import { SocialOauthInterface } from 'src/application/services/social-auth.service';
import { SocialAuthUserStrategyService } from 'src/application/services/social-strategy.service';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

export class GoogleAuthUsecases {
  constructor(
    private readonly userAdapter: UserAdapter,
    private readonly profileAdapter: ProfileAdapter,
    private readonly socialAuthStrategry: SocialAuthUserStrategyService,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    @Inject('SocialAuthService')
    private readonly socialAuthService: SocialOauthInterface,
  ) { }

  async handle(code: string) {
    const { access_token, id_token } =
      await this.socialAuthService.getTokens(code);

    const { email, given_name, family_name, picture } =
      await this.socialAuthService.getUserInfo({
        access_token,
        id_token,
      });
    if (!email) {
      throw new GoogleAuthException(
        'Could not get email from google',
        'googleAuth',
      );
    }
    const foundUser = await this.userAdapter.findOne({ email });
    const foundProfile = await this.profileAdapter.findOne({
      profile_id: foundUser.id,
    });
    let user: UserEntity;

    if (!foundUser) {
      user = await this.socialAuthStrategry.createUser({
        email,
        given_name,
        family_name,
        picture,
      });
    }
    if (foundUser && !foundProfile) {
      await this.socialAuthStrategry.createProfile(
        picture,
        given_name,
        family_name,
        foundUser.id,
      );
    }

    return await this.tokenService.generateAuthTokens(foundUser.id ?? user.id);
  }
}
