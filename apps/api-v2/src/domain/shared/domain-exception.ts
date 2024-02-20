export class DomainException extends Error {
  domain: string;

  constructor(message: string, domain: string) {
    super(message);
    this.name = this.constructor.name;
    this.domain = domain;
    this.message = `${domain}: ${message}`;
  }
}
