import { ApplicationException } from './application.exception';

export class RefreshTokenException extends ApplicationException {
  declare status: number;

  declare userMessage: string;

  constructor(message: string, service: string) {
    super(message, service);
    this.name = this.constructor.name;
    this.status = 401;
    this.userMessage = 'Unauthorized';
    this.message = `${service}: ${message}`;
  }
}
