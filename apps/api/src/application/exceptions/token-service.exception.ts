import { ApplicationException } from './application.exception';

export class TokenServiceException extends ApplicationException {
  constructor(message: string, service: string) {
    super(message, service);
    this.name = this.constructor.name;
    this.message = `${this.name}: ${message}`;
  }
}
