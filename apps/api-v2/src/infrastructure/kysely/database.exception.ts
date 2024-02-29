export class DatabaseException extends Error {
  status: number;
  userMessage: string;

  constructor(error: Error) {
    super(error.message);
    this.name = this.constructor.name;
    this.status = 500;
    this.userMessage = 'Internal server error';
    this.message = `${this.name}: ${error.message} `;
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
