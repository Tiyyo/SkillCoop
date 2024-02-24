import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDTO {
  @IsNotEmpty()
  @IsString()
  date: string;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  @IsNotEmpty()
  @IsNumber()
  location_id: number;
  @IsNotEmpty()
  @IsNumber()
  required_participants: number;
  @IsNotEmpty()
  @IsString()
  organizer_id: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  participants?: string[];
  @IsOptional()
  @IsString()
  status_name: string;
  @IsOptional()
  @IsString()
  visibility: string;
  @IsOptional()
  @IsNumber()
  price: number;
}
