import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'path', maxCount: 1 },
        { name: 'avatar', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const uploadPath =
              file.fieldname === 'path' ? './track_path' : './track_avatar';
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            if (file.fieldname === 'avatar') {
              // Для аватара генерируем уникальное имя файла
              const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
              cb(null, uniqueName);
            } else {
              // Для трека сохраняем оригинальное имя файла
              cb(null, file.originalname);
            }
          },
        }),
      },
    ),
  )
  async createTrack(
    @UploadedFiles()
    files: { path?: Express.Multer.File[]; avatar?: Express.Multer.File[] },
    @Body() trackData: any,
  ) {
    const path = files.path && files.path[0] ? files.path[0].filename : '';
    const avatar =
      files.avatar && files.avatar[0]
        ? files.avatar[0].filename
        : 'default_avatar.png';

    const completeTrackData = {
      ...trackData,
      path,
      avatar,
    };

    return this.tracksService.create(completeTrackData);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'path', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const folder =
              file.fieldname === 'avatar' ? './track_avatar' : './track_path';
            cb(null, folder);
          },
          filename: (req, file, cb) => {
            const filename =
              file.fieldname === 'avatar'
                ? `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`
                : file.originalname;
            cb(null, filename);
          },
        }),
      },
    ),
  )
  async updateTrack(
    @Param('id') id: number,
    @UploadedFiles() files: { avatar?: Express.Multer.File[], path?: Express.Multer.File[] },
    @Body() trackData: Partial<Track>,
  ) {
return this.tracksService.updateTrack(id, trackData, files);
  }
  @Get()
  async getTracks(): Promise<Track[]> {
    return await this.tracksService.getTracks();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.tracksService.deletePlaylist(id);
  }
}
