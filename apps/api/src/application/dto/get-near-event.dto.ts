import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetEventNearbyDTO {
  @IsString()
  @IsNotEmpty()
  userCountry: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  userLongitude: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  userLatitude: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @IsString()
  @IsNotEmpty()
  profileId: string;
}
