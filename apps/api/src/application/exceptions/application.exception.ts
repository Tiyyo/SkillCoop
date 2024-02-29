export class ApplicationException extends Error {
  declare status: number;

  declare userMessage: string;

  constructor(message: string, service: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = `${service}: ${message}`;
    this.status = 500;
    this.userMessage = 'Request could not be processed';
  }
  getStatus() {
    return this.status;
  }
  getUserMessage() {
    return this.userMessage;
  }
  getMessage() {
    return this.message;
  }
}
