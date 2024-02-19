export interface TokenServiceInterface {
  generateToken(
    expireTime: string,
    key: string,
    payload: Record<string, any>,
  ): Promise<string>;
  verifyToken(token: string, key: string): Record<string, any> | null;
}
