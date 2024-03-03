import { IsNotEmpty, IsOptional, ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class CreateGroupConversationDto {
  @IsNotEmpty()
  @IsString()
  creator_id: string;
  @IsOptional()
  @IsString()
  title?: string;
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsArray()
  participants_ids: string[];
}
