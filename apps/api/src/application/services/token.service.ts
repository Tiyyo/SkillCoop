export interface TokenServiceInterface {
  generateToken(
    expireTime: string,
    key: string,
    payload: Record<string, any>,
  ): Promise<string>;
  verifyToken(token: string, key: string): Promise<Record<string, any> | null>;
  generateAuthTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
