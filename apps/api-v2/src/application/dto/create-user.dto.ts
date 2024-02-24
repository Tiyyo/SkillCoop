import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/^(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one special character',
  })
  @Length(8, 36)
  password: string;
  @IsNotEmpty()
  confirmedPassword: string;
  @IsNotEmpty()
  termAndService: boolean;
}
