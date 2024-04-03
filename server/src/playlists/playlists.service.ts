import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';

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
    
    if (playlistData.avatar && playlistToUpdate.avatar && playlistToUpdate.avatar !== 'avatar_default.png') {
      const oldAvatarPath = path.join('./playlist_avatar', playlistToUpdate.avatar);
      try {
        await fs.unlink(oldAvatarPath);
        console.log(`Старый аватар плейлиста удален: ${oldAvatarPath}`);
      } catch (error) {
        console.error(`Ошибка при удалении старого аватара плейлиста: ${error}`);
      }
    }

    await this.playlistRepository.update(id, playlistData);
    return this.playlistRepository.findOne({ where: { id } });
  }

  async deletePlaylist(playlistId: number): Promise<void> {
    const playlist = await this.playlistRepository.findOne({
      where: {
        id: playlistId,
      },
    });

    if (!playlist) {
      throw new NotFoundException('Плейлист не найден');
    }

    // Проверяем, что у плейлиста есть аватар и это не дефолтный аватар
    if (playlist.avatar && playlist.avatar !== 'avatar_default.png') {
      try {
        const filePath = path.join('./playlist_avatar', playlist.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар плейлиста удален: ${filePath}`);
      } catch (error) {
        // Логируем ошибку, но не прерываем процесс, чтобы плейлист все равно был удален
        console.error(`Ошибка при удалении аватара плейлиста: ${error}`);
      }
    }

    // Удаляем плейлист после обработки его аватара
    const result = await this.playlistRepository.delete(playlistId);
    if (result.affected === 0) {
      throw new NotFoundException('Ошибка при удалении плейлиста');
    }
  }

}
