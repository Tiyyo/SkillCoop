import { Controller, Delete, HttpCode, Param } from '@nestjs/common';

@Controller('user')
export class DeleteUserController {
  constructor() { }
  @Delete('/:userId')
  @HttpCode(204)
  async destroy(@Param('userId') userId: string) {
    return {
      success: true,
    };
  }
}
