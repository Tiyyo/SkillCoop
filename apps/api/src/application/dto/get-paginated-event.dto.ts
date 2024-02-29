import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPaginatedEventDTO {
  @IsString()
  @IsNotEmpty()
  profileId: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number;
}
