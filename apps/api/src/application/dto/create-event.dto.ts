import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDTO {
  @IsString()
  start_date: string;
  @IsString()
  start_time: string;
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
