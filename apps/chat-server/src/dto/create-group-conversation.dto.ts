import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ArrayNotEmpty, IsArray, IsString, ValidateNested } from "class-validator";

class UserConv {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsString()
  @IsOptional()
  avatar: string | null;
}

export class CreateGroupConversationDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserConv)
  creator: UserConv;
  @IsOptional()
  @IsString()
  title?: string;
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserConv)
  participants: UserConv[];
}
