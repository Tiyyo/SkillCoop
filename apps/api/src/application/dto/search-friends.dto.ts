import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchFriendsDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  profileId: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;
}
