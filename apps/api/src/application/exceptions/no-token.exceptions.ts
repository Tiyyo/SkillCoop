export class NoTokenException extends Error {
  error: string;
  constructor() {
    super('No_Token_Provided');
    this.error = 'No_Token_Provided';
  }
}
