export default class ForbidenError extends Error {
  message: string;
  name: string;
  status: number;
  userMessage: string;

  constructor(
    message: string,
    userMessage?: string,
    fn?: string,
    line?: string,
  ) {
    super(message);
    this.name = 'Forbiden';
    this.status = 403;
    this.userMessage = userMessage ?? 'Not allowed';
    this.message = `Not Found Error in ${fn ?? 'NC'} at line ${
      line ?? 'NC'
    } :${message}`;
  }
}
