import UserInputError from '../../helpers/errors/user-input.error.js';
import { LoginAttemptTracker } from './login-tracker.js';
import { User as TUser } from '@skillcoop/types';

//Migrated
export class CredentialsValidator {
  email: string;
  password: string;
  user: TUser;

  constructor(email: string, password: string, user: TUser) {
    this.email = email;
    this.password = password;
    this.user = user;
  }
  private async passwordMatch() {
    if (!this.user)
      throw new UserInputError(
        "Can't find any user with this email",
        'Email or Password incorrect',
      );
    const tracker = new LoginAttemptTracker(
      { email: this.email, password: this.password },
      this.user,
    );
    return await tracker.compare();
  }
  public async validate() {
    if (this.user.blocked || !this.user.verified) return null;
    return await this.passwordMatch();
  }
}
