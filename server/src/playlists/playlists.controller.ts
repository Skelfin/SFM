import { Controller, Delete, Get, Post, Body, Put, Request, Param, UseGuards } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Защита маршрута
  create(@Request() req, @Body() createPlaylistDto: CreatePlaylistDto) {
    // req.user.id доступен благодаря JwtAuthGuard, который извлекает пользователя из токена
    return this.playlistsService.create(req.user.id, createPlaylistDto);
  }

  @Get()
  async getPlaylists(): Promise<Playlist[]> { // Переименован метод для корректного отображения его назначения
    return await this.playlistsService.getPlaylists(); // Использование playlistsService для получения списка плейлистов
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() playlistData: Partial<Playlist>) {
    return this.playlistsService.updatePlaylist(id, playlistData);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.playlistsService.deletePlaylist(id);
  }
}
