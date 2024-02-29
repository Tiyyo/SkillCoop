import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export interface SearchProfileParams {
  userProfileId: string;
  username: string;
  page: number;
}

export class SearchProfileDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  userProfileId: string;

  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  page: number;
}
