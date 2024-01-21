import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOneToOneConversationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id_one: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id_two: number;
}
