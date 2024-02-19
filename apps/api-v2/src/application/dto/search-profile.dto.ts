import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export interface SearchProfileParams {
  userProfileId: number;
  search: string;
  page: number;
}

export class SearchProfileDTO {
  @IsNotEmpty()
  @IsString()
  search: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  userProfileId: number;

  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @IsPositive()
  @IsInt()
  page: number;
}
