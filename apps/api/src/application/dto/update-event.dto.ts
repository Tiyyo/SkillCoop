import { PartialType } from '@nestjs/swagger';
import { CreateEventDTO } from './create-event.dto';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEventDTO extends PartialType(CreateEventDTO) {
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  event_id: number;
  @IsNotEmpty()
  @IsString()
  profile_id: string;
  @IsOptional()
  @IsString()
  location: string;
  @IsOptional()
  @IsString()
  date: string;
  @IsOptional()
  @IsNumber()
  duration: number;
  @IsOptional()
  @IsNumber()
  required_participants: number;
  @IsOptional()
  @IsString()
  organizer_id: string;
  @IsOptional()
  @IsString()
  status_name: string;
}
