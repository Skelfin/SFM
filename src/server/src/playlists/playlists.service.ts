import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
  ) {}
  async create(
    userId: number,
    createPlaylistDto: CreatePlaylistDto,
  ): Promise<Playlist> {
    const newPlaylist = this.playlistRepository.create({
      ...createPlaylistDto,
      user: { id: userId }, // Ассоциируем плейлист с пользователем через его ID
    });
    return await this.playlistRepository.save(newPlaylist);
  }

  async getPlaylists(): Promise<Playlist[]> {
    const playlists = await this.playlistRepository.find({
      relations: ['user', 'tracks'],
    });

    const filteredPlaylists = playlists.filter(playlist => {
      const user = playlist.user;

      // Для пользователей с access_rights = 0, исключаем первый плейлист
      if (user.access_rights === 0) {
        const userPlaylists = playlists.filter(p => p.user.id === user.id);
        const firstPlaylist = userPlaylists.reduce((prev, curr) => {
          return new Date(prev.createdAt) <= new Date(curr.createdAt) ? prev : curr;
        });

        return playlist.id !== firstPlaylist.id;
      }

      // Для администраторов с access_rights = 1, ничего не исключаем
      return true;
    });

    return filteredPlaylists;
  }

  async getPlaylistById(id: number): Promise<Playlist> {
    return this.playlistRepository.findOne({
      where: { id: id }, 
      relations: ['user', 'tracks'], 
    });
  }

  async getPlaylistsByUser(userId: number): Promise<Playlist[]> {
    return await this.playlistRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'tracks'],
    });
  }

  async getTracksByPlaylistId(playlistId: number): Promise<Track[]> {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId },
      relations: ['tracks', 'tracks.album', 'tracks.album.authors'], 
    });
    return playlist.tracks;
  }

  async updatePlaylist(
    id: number,
    playlistData: Partial<UpdatePlaylistDto>,
  ): Promise<Playlist> {
    const playlistToUpdate = await this.playlistRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
    if (!playlistToUpdate) {
      throw new Error('Плейлист не найден');
    }


    if (playlistData.trackIds) {
      const newTracks = playlistData.trackIds.map(id => ({ id: Number(id) }) as Track);
      playlistToUpdate.tracks = newTracks;
    } else {
      playlistToUpdate.tracks = [];
    }

    if (
      playlistData.avatar &&
      playlistToUpdate.avatar &&
      playlistToUpdate.avatar !== 'avatar_default.png' &&
      playlistToUpdate.avatar !== 'favorite.png' &&
      playlistToUpdate.avatar !== 'favorite.png'
    ) {
      const oldAvatarPath = path.join(
        'playlist_avatar',
        playlistToUpdate.avatar,
      );
      try {
        await fs.unlink(oldAvatarPath);
        console.log(`Старый аватар плейлиста удален: ${oldAvatarPath}`);
      } catch (error) {
        console.error(
          `Ошибка при удалении старого аватара плейлиста: ${error}`,
        );
      }
    }

    playlistToUpdate.name = playlistData.name || playlistToUpdate.name;
    if (playlistData.description !== undefined) {
      playlistToUpdate.description = playlistData.description;
    }
    if (playlistData.avatar) {
      playlistToUpdate.avatar = playlistData.avatar;
    }

    await this.playlistRepository.save(playlistToUpdate);
    return this.playlistRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
  }

  async updatePlaylistBasicInfo(
    id: number,
    playlistData: Partial<UpdatePlaylistDto>,
  ): Promise<Playlist> {
    const playlistToUpdate = await this.playlistRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
    if (!playlistToUpdate) {
      throw new Error('Плейлист не найден');
    }

    if (
      playlistData.avatar &&
      playlistToUpdate.avatar &&
      playlistToUpdate.avatar !== 'avatar_default.png' &&
      playlistToUpdate.avatar !== 'favorite.png'
    ) {
      const oldAvatarPath = path.join(
        'playlist_avatar',
        playlistToUpdate.avatar,
      );
      try {
        await fs.unlink(oldAvatarPath);
        console.log(`Старый аватар плейлиста удален: ${oldAvatarPath}`);
      } catch (error) {
        console.error(
          `Ошибка при удалении старого аватара плейлиста: ${error}`,
        );
      }
    }

    playlistToUpdate.name = playlistData.name || playlistToUpdate.name;
    if (playlistData.description !== undefined) {
      playlistToUpdate.description = playlistData.description;
    }
    if (playlistData.avatar) {
      playlistToUpdate.avatar = playlistData.avatar;
    }

    await this.playlistRepository.save(playlistToUpdate);
    return this.playlistRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
  }

  async deletePlaylist(playlistId: number): Promise<void> {
    const playlist = await this.playlistRepository.findOne({
      where: {
        id: playlistId,
      },
      relations: ['tracks'],
    });

    if (!playlist) {
      throw new NotFoundException('Плейлист не найден');
    }

    // Проверяем, что у плейлиста есть аватар и это не дефолтный аватар
    if (playlist.avatar && playlist.avatar !== 'avatar_default.png' && playlist.avatar !== 'favorite.png') {
      try {
        const filePath = path.join('playlist_avatar', playlist.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар плейлиста удален: ${filePath}`);
      } catch (error) {
        // Логируем ошибку, но не прерываем процесс, чтобы плейлист все равно был удален
        console.error(`Ошибка при удалении аватара плейлиста: ${error}`);
      }
    }

    playlist.tracks = [];
    await this.playlistRepository.save(playlist);

    // Удаляем плейлист после обработки его аватара
    const result = await this.playlistRepository.delete(playlistId);
  }
}
