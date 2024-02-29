import { IsNotEmpty, IsString } from 'class-validator';

export class GetLastSharedDTO {
  @IsString()
  @IsNotEmpty()
  profileId: string;

  @IsString()
  @IsNotEmpty()
  friendId: string;
}
