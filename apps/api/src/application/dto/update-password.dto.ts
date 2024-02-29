import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @IsString()
  old_password: string;
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
  new_password: string;
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
  confirm_new_password: string;
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
