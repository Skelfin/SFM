import {
  Controller,
  UploadedFile,
  Delete,
  Get,
  Post,
  Body,
  Put,
  Request,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Track } from 'src/tracks/entities/track.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './playlist_avatar', // Указывает, куда сохранять файлы
        filename: (req, file, cb) => {
          // Как формировать имя файла
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const extension = extname(file.originalname);
          cb(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  create(
    @Request() req,
    @Body() createPlaylistDto: CreatePlaylistDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Если файл не загружен, используем имя файла дефолтного аватара
    createPlaylistDto.avatar = file ? file.filename : 'avatar_default.png';

    return this.playlistsService.create(req.user.id, createPlaylistDto);
  }

  @Get()
  async getPlaylists(): Promise<Playlist[]> {
    // Переименован метод для корректного отображения его назначения
    return await this.playlistsService.getPlaylists(); // Использование playlistsService для получения списка плейлистов
  }

  @Get('/user/:userId')
  async getPlaylistsByUser(@Param('userId') userId: number): Promise<Playlist[]> {
    return await this.playlistsService.getPlaylistsByUser(userId);
  }

  @Get(':playlistId/tracks')
  async getTracksByPlaylistId(@Param('playlistId') playlistId: number): Promise<Track[]> {
    return await this.playlistsService.getTracksByPlaylistId(playlistId);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './playlist_avatar',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const extension = extname(file.originalname);
          cb(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async updatePlaylist(
    @Param('id') id: number,
    @Body() playlistData: Partial<UpdatePlaylistDto>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      playlistData.avatar = file.filename;
    }
    return this.playlistsService.updatePlaylist(id, playlistData);
  }

  @Delete(':id')
  async deletePlaylist(@Param('id') id: number): Promise<void> {
    return await this.playlistsService.deletePlaylist(id);
  }
}
