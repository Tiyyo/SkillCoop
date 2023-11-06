export default class AuthorizationError extends Error {
  status: number;
  cause?: string;
  message: string;
  userMessage: string;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'AuthorizationError';
    this.cause = message;
    this.status = 401;
    this.userMessage = 'You are not authorized to access this resource';
    // TODO : find a better implementation
    if (message === 'No access') {
      this.userMessage = 'No access';
    }
  }
}
