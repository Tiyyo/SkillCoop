export default class NotFoundError extends Error {
  status: number;
  name: string;
  userMessage: string;

  constructor(message: string, fn?: string, line?: string) {
    super(message);
    this.message = `Not Found Error in ${fn ?? 'NC'} at line ${
      line ?? 'NC'
    } :${message}`;
    this.status = 204;
    this.userMessage = "Item(s) couldn't be found";
    this.name = 'NotFoundError';
  }
}
