import { Controller, Post, Body, Put, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { User } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user-form')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads', // папка для загрузки
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
  }))
  async createUser(@UploadedFile() file: Express.Multer.File, @Body() userData: any) {
    userData.avatar = file ? `${file.filename}` : ''; // Путь к файлу для сохранения в БД
    return this.userFormService.createUser(userData);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: Partial<User>) {
    return this.userFormService.updateUser(id, userData);
  }
}
