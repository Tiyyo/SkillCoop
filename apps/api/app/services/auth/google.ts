import qs from 'qs';
import axios from 'axios';
import ServerError from '#errors/server.error';
// TODO replace axios by fetch when avaiable in LTS

type GoogleOAuthToken = {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
};

type GoogleUserResult = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export default {
  async getOAuthToken({ code }: { code: string }) {
    const rootURL = 'https://oauth2.googleapis.com/token';
    const options = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.API_URL + '/auth/google/callback',
      grant_type: 'authorization_code',
    };
    try {
      const { data } = await axios.post<GoogleOAuthToken>(
        rootURL,
        qs.stringify(options),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ServerError(
          'getOAuthToken failed to get OAuth Token' + error.message,
        );
      }
      return { access_token: null, id_token: null };
    }
  },
  async getUser({
    id_token,
    access_token,
  }: {
    id_token: string;
    access_token: string;
  }) {
    try {
      const { data } = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
          ${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ServerError(
          'Error getting user informations from google' + error.message,
        );
      }
      return {
        email: null,
        given_name: null,
        family_name: null,
        picture: null,
      };
    }
  },
};
