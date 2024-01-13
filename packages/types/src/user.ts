export type User = {
  email: string;
  password: string;
  verified: number;
  blocked: number;
  failed_attempts: number;
  created_at?: string
  updated_at?: string | null
};

export type UserInfosToken = {
  user_id: number;
  email: string;
};

export type GoogleUserInfos = {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  confirmedPassword: string;
  termAndService: boolean | string;
};

export type SendConfirmationEmail = {
  emailToken: string;
  email: string;
  userId: number;
};

export type SendResetPasswordEmail = {
  resetToken: string;
  email: string;
  userId: number;
};

export type UpdateEmail = {
  email: string;
  user_id: number;
};

export type ResetPassword = {
  password: string;
  confirmPassword: string;
};

export type Credentials = Omit<User, 'failed_attempts' | 'blocked' | 'verified'>;
