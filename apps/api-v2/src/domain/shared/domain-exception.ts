export class DomainException extends Error {
  domain: string;

  userMessage: string;

  status: number;

  constructor(message: string, domain: string) {
    super(message);
    this.name = this.constructor.name;
    this.domain = domain;
    this.message = `${domain}: ${message}`;
    this.userMessage =
      'We encountered an issue processing your request. Please try again later.';
    this.status = 400;
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
