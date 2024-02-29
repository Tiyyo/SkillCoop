import { IsNotEmpty, IsString } from 'class-validator';

export class SendRequestDTO {
  @IsNotEmpty()
  @IsString()
  adder_id: string;

  @IsNotEmpty()
  @IsString()
  friend_id: string;
}
