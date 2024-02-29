import { ApplicationException } from './application.exception';

export class AccessTokenException extends ApplicationException {
  declare status: number;

  declare userMessage: string;

  constructor(message: string, service: string) {
    super(message, service);
    this.name = this.constructor.name;
    this.status = 401;
    this.userMessage = 'No access token provided';
    this.message = `${service}: ${message}`;
  }
}
