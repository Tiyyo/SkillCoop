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

export type LoginAttemptReturn = {
  blocked?: boolean;
  verified?: boolean;
  failedAttempts?: number;
  error?: string;
  status: number;
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export type UserDBEntity = {
  email: string;
  password: string;
  verified: number;
  blocked: number;
  failed_attempts: number;
  created_at?: string;
  updated_at?: string | null;
};
