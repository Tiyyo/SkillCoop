export class ApplicationException extends Error {
  constructor(message: string, service: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = `${service}: ${message}`;
  }
}
