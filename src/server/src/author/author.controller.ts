import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './author_avatar',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createAuthor(
    @UploadedFile() file: Express.Multer.File,
    @Body() authorData: any,
  ) {
    authorData.avatar = file ? `${file.filename}` : 'avatar_default.png';
    return this.authorService.createAuthor(authorData);
  }

  @Get()
  async getAuthor(): Promise<Author[]> {
    return await this.authorService.getAuthor();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './author_avatar',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async updateAuthor(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() authorData: Partial<Author>,
  ) {
    if (file) {
      authorData.avatar = file.filename;
    }
    return this.authorService.updateAuthor(id, authorData);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: number): Promise<void> {
    return await this.authorService.deleteAuthor(id);
  }
}
