import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateImageDTO {
  @IsString()
  @IsUrl()
  url: string;
  @IsOptional()
  @IsString()
  key: string | null;
  @IsOptional()
  @IsNumber()
  size: number | null;
}
