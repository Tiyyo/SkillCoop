export interface SocialOauthInterface {
  getTokens(
    code: string,
  ): Promise<{ access_token: string | null; id_token: string | null }>;
  getUserInfo({
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
  }>;
}
