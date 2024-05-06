import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { User } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user-form')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './user_avatar', // папка для загрузки
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() userData: any,
  ) {
    userData.avatar = file ? `${file.filename}` : 'avatar_default.png'; // Путь к файлу для сохранения в БД
    return this.userFormService.createUser(userData);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './user_avatar',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async updateUser(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() userData: Partial<User>,
  ) {
    if (file) {
      userData.avatar = file.filename;
    }
    return this.userFormService.updateUser(id, userData);
  }
}
