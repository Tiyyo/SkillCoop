import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class MarkNotificationDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  notificationId: number;
}
