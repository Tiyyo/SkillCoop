import {
  Body,
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileIdUnderscoreDTO } from 'src/application/dto/profileId.dto';
import { UpdateImageProfileUsecases } from 'src/application/usecases/profile/update-image.usecases';

@Controller('profile')
export class UpdateImageController {
  constructor(
    private readonly updateImageUsecases: UpdateImageProfileUsecases,
  ) { }
  @Patch('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ProfileIdUnderscoreDTO,
  ) {
    console.log(file);
    return await this.updateImageUsecases.updateProfileImage(
      file,
      body.profile_id,
    );
  }
}
