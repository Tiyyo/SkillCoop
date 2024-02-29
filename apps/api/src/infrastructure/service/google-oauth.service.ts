import { ApplicationException } from 'src/application/exceptions/application.exception';
import { SocialOauthInterface } from 'src/application/services/social-auth.service';
import { NestEnvVariableAdapterService } from './env.adapter.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOAuthService implements SocialOauthInterface {
  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) {}
  async getTokens(
    code: string,
  ): Promise<{ access_token: string | null; id_token: string | null }> {
    const rootURL = 'https://oauth2.googleapis.com/token';
    const options = {
      code,
      client_id: this.envVariableService.getEnvVariable('GOOGLE_CLIENT_ID'),
      client_secret: this.envVariableService.getEnvVariable(
        'GOOGLE_CLIENT_SECRET',
      ),
      redirect_uri:
        this.envVariableService.getApiUrl() + '/auth/google/callback',
      grant_type: 'authorization_code',
    };
    try {
      const response = await fetch(rootURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(options).toString(), // Converts the 'options' object to a URL-encoded string
      });
      console.log('Response from fetch', response);
      if (!response.ok) {
        throw new ApplicationException(
          `Could not get token from google`,
          'GoogleOAuthService',
        );
      }
      const data = await response.json();
      console.log('Data from fetch', data);
      return data;
    } catch (error) {
      console.log('Error', error);
      if (error instanceof Error) {
        throw new ApplicationException(
          'getOAuthToken failed to get OAuth Token' + error.message,
          'GoolgeOAuthService',
        );
      }
      return { access_token: null, id_token: null };
    }
  }

  async getUserInfo({
    id_token,
    access_token,
  }: {
    id_token: string;
    access_token: string;
  }): Promise<{
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
  }> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
          ${access_token}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      );
      if (!response.ok) {
        throw new ApplicationException(
          `Error getting user informations from google`,
          'GoogleOAuthService',
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApplicationException) {
        return {
          email: '',
          given_name: '',
          family_name: '',
          picture: '',
        };
      }
    }
  }
}
