import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  async getPlaylists(): Promise<Playlist[]> { // Переименован метод для корректного отображения его назначения
    return await this.playlistsService.getPlaylists(); // Использование playlistsService для получения списка плейлистов
  }
}
