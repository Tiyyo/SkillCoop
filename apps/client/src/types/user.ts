export type User = {
  email: string;
  password: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  confirmedPassword: string;
  termAndService: boolean | string;
};

export type UpdateEmail = {
  email: string;
  user_id: number;
};

export type ResetPassword = {
  password: string;
  confirmPassword: string;
};