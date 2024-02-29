export interface EmailServiceInterface {
  send(email: string, subject: string, text: string): Promise<void>;
  confirmEmail(email: string, token: string, userId: string): Promise<void>;
  resetPassword(email: string, token: string, userId: string): Promise<void>;
}
