import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnRatingDTO {
  @IsNotEmpty()
  @IsString()
  pace: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';
  @IsNotEmpty()
  @IsString()
  shooting: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';
  @IsNotEmpty()
  @IsString()
  passing: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';
  @IsNotEmpty()
  @IsString()
  dribbling: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';
  @IsNotEmpty()
  @IsString()
  defending: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';
  @IsNotEmpty()
  @IsString()
  profile_id: string;
}
