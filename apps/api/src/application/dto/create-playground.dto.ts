import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaygroundDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  post_code: string;
  @IsString()
  @IsNotEmpty()
  region: string;
  @IsString()
  @IsNotEmpty()
  country: string;
  @IsNumber()
  @IsNotEmpty()
  latitude: number;
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
