import { ApplicationException } from './application.exception';

export class UndefinedException extends ApplicationException {
  declare status: number;

  declare userMessage: string;

  constructor(variable: string, service: string) {
    super(variable, service);
    this.name = this.constructor.name;
    this.status = 500;
    this.userMessage = 'Internal server error';
    this.message = `${service}: ${variable} is not defined`;
  }
}
