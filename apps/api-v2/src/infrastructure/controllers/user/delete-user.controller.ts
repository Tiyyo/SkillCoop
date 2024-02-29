import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { DeleteUserUsecases } from 'src/application/usecases/user/delete.user.usecases';
import { DeleteAccountGuard } from 'src/infrastructure/nest/guards/delete-account.guard';

@Controller('user')
export class DeleteUserController {
  constructor(private readonly deleteUserUsecases: DeleteUserUsecases) {}
  @Delete('/:userId')
  @HttpCode(204)
  @UseGuards(DeleteAccountGuard)
  async destroy(@Param('userId') userId: string) {
    return this.deleteUserUsecases.destroy(userId);
  }
}
