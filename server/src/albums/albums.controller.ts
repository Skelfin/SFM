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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';


@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './album_avatar', 
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumData: any,
  ) {
    albumData.avatar = file ? `${file.filename}` : 'avatar_default.png';
    return this.albumsService.createAlbum(albumData);
  }

  @Get()
  async getAuthor(): Promise<Album[]> {
    return await this.albumsService.getAlbum();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './album_avatar',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async updateAlbum(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() albumData: Partial<Album>,
  ) {
    if (file) {
      albumData.avatar = file.filename;
    }
    return this.albumsService.updateAlbum(id, albumData);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: number): Promise<void> {
    return await this.albumsService.deleteAlbum(id);
  }
}