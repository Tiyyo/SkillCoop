import { ApplicationException } from './application.exception';

export class RessourceNotFoundException extends ApplicationException {
  declare status: number;

  declare userMessage: string;

  constructor(message: string, service: string) {
    super(message, service);
    this.name = this.constructor.name;
    this.message = `${service}: ${message}`;
    this.userMessage = 'Ressource not found';
    this.status = 404;
  }
}
