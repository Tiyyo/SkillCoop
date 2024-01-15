export default class ServerError extends Error {
  message: string;
  status: number;
  cause: string;
  userMessage: string;

  constructor(message: string, fn?: string) {
    super(message);
    this.message = `Server Error in ${fn} : ${message}`;
    this.name = 'ServerError';
    this.cause = message;
    this.status = 500;
    this.userMessage = 'Internal server error';
  }
}
