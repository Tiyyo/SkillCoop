import { Credentials, User as TUser } from '@skillcoop/types';
import bcrypt from 'bcrypt';
import { FailedAttempsHandler } from './failed-attemps-handler.js';

export class LoginAttemptTracker {
  submittedCredentials: Credentials;
  user: TUser;

  constructor(submittedCredentials: Credentials, user: TUser) {
    this.submittedCredentials = submittedCredentials;
    this.user = user;
  }
  async compare() {
    const match = await bcrypt.compare(
      this.submittedCredentials.password,
      this.user.password,
    );

    if (match) return 'success';
    const handler = new FailedAttempsHandler(this.user);
    return await handler.getTrack();
  }
}
