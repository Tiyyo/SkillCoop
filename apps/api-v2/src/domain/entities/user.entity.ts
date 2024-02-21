export class UserEntity {
  id: string;
  email: string;
  password: string;
  verified?: boolean;
  blocked?: boolean;
  failed_attempts?: number;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.verified = false;
    this.blocked = false;
    this.failed_attempts = 0;
  }
}
