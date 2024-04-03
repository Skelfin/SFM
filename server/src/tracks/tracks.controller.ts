import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getPlaylists(): Promise<Track[]> { // Переименован метод для корректного отображения его назначения
    return await this.tracksService.getTracks(); // Использование playlistsService для получения списка плейлистов
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.tracksService.deletePlaylist(id);
  }

}
