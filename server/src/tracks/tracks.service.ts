import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    private entityManager: EntityManager,
  ) {}

  async create(trackData: Track): Promise<Track> {
    const newTrack = this.trackRepository.create(trackData);
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  async getTracks(): Promise<Track[]> {
    return await this.trackRepository.find({
      relations: ['album', 'playlists'],
    });
  }

  async updateTrack(
    id: number,
    trackData: Partial<Track>,
    files: { avatar?: Express.Multer.File[]; path?: Express.Multer.File[] },
  ): Promise<Track> {
    const trackToUpdate = await this.trackRepository.findOne({ where: { id } });
    if (!trackToUpdate) {
      throw new Error('Трек не найден');
    }

    if (
      files.avatar &&
      files.avatar[0] &&
      trackToUpdate.avatar &&
      trackToUpdate.avatar !== 'default_avatar.png'
    ) {
      const oldAvatarPath = path.join('./track_avatar', trackToUpdate.avatar);
      try {
        await fs.unlink(oldAvatarPath);
      } catch (error) {
        console.error(`Ошибка при удалении файла аватара: ${error.message}`);
      }
      trackData.avatar = files.avatar[0].filename; // Обновляем информацию об аватаре
    } else if (files.avatar && files.avatar[0]) {
      // Если у трека нет аватара или его имя "default_avatar.png", просто обновляем информацию об аватаре на новую
      trackData.avatar = files.avatar[0].filename;
    }

    // Удаление старого файла аватара, если аватар обновлен
    if (files.path && files.path[0] && trackToUpdate.path) {
      const oldTrackPath = path.join('./track_path', trackToUpdate.path);
      try {
        await fs.unlink(oldTrackPath);
      } catch (error) {
        console.error(`Ошибка при удалении файла трека: ${error.message}`);
      }
      trackData.path = files.path[0].filename;
    }

    await this.trackRepository.update(id, trackData);
    return this.trackRepository.findOne({ where: { id } });
  }

  async deleteTrack(trackId: number): Promise<void> {
    const track = await this.trackRepository.findOne({
      where: {
        id: trackId,
      },
    });

    if (!track) {
      throw new Error('Трек не найден');
    }

    if (track.avatar && track.avatar !== 'avatar_default.png') {
      try {
        const filePath = path.join('./track_avatar', track.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар плейлиста удален: ${filePath}`);
      } catch (error) {
        console.error(`Ошибка при удалении аватара плейлиста: ${error}`);
      }
    }

    if (track.path) {
      try {
        const filePath = path.join('./track_path', track.path);
        await fs.unlink(filePath);
        console.log(`Трек удален: ${filePath}`);
      } catch (error) {
        console.error(`Ошибка при удалении трека: ${error}`);
      }
    }
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete('playlist_tracks', {
        id_track: trackId,
      });
    });

    // Удаление самого трека
    await this.trackRepository.delete(trackId);
  }
}
