import { TrustedSignerDoesNotExist } from "@aws-sdk/client-cloudfront";

export default class APITypeError extends Error {
  message: string;
  status: number;
  cause: string;
  userMessage: string;

  constructor(message: string, fn?: string, line?: string) {
    super(message);
    this.message = `Type Error in ${fn ?? 'NC'} at line ${line ?? 'NC'} :${message}`;
    this.name = 'TypeError';
    this.cause = message;
    this.status = 400;
    this.userMessage = 'Type Error';
  }
}
