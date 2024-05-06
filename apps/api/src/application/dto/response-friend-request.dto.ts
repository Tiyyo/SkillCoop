import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseFriendRequestDTO {
  @IsNotEmpty()
  @IsString()
  adder_id: string;
  @IsNotEmpty()
  @IsString()
  friend_id: string;
  @IsNotEmpty()
  @IsString()
  status_name: string;
  @IsNotEmpty()
  @IsString()
  username?: string;
}
