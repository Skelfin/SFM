import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
  ) {}
  async create(userId: number, createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = this.playlistRepository.create({
      ...createPlaylistDto,
      user: { id: userId } // Ассоциируем плейлист с пользователем через его ID
    });
    return await this.playlistRepository.save(newPlaylist);
  }

  async getPlaylists(): Promise<Playlist[]> {
    return await this.playlistRepository.find({ relations: ['user', 'tracks'] });
  }

  async updatePlaylist(id: number, playlistData: Partial<Playlist>): Promise<Playlist> {
    const playlistToUpdate = await this.playlistRepository.findOne({ where: { id } });
    if (!playlistToUpdate) {
      throw new Error('Плейлист не найден');
    }
    delete playlistData.id;

    await this.playlistRepository.update(id, playlistData);
    return this.playlistRepository.findOne({ where: { id } });
  }

  async deletePlaylist(playlistId: number): Promise<void> {
    const result = await this.playlistRepository.delete(playlistId);
    if (result.affected === 0) {
      throw new BadRequestException('Пользователь не найден');
    }
  }

}
