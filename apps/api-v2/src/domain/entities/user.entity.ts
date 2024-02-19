export class UserEntity {
  id: string;
  email: string;
  password: string;
  verified?: boolean;
  blocked?: boolean;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.verified = false;
    this.blocked = false;
  }
}
