import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async createAlbum(albumData: Album): Promise<Album> {
    const newAlbum = this.albumRepository.create(albumData);
    await this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: number, albumData: Partial<Album>): Promise<Album> {
    const albumToUpdate = await this.albumRepository.findOne({
      where: { id },
    });
    if (!albumToUpdate) {
      throw new Error('Пользователь не найден');
    }

    if (
      albumData.avatar &&
      albumToUpdate.avatar &&
      albumToUpdate.avatar !== 'avatar_default.png'
    ) {
      const oldAvatarPath = path.join('./album_avatar', albumToUpdate.avatar);
      try {
        await fs.unlink(oldAvatarPath);
        console.log(`Старый аватар удален: ${oldAvatarPath}`);
      } catch (error) {
        console.warn(`Ошибка при удалении старого аватара: ${error}`);
      }
    }

    await this.albumRepository.update(id, albumData);
    return this.albumRepository.findOne({ where: { id } });
  }

  async getAlbum(): Promise<Album[]> {
    return await this.albumRepository.find({
      relations: ['tracks', 'authors'],
    });
  }

  async deleteAlbum(albumId: number): Promise<void> {
    const album = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },
    });
  
    if (!album) {
      throw new BadRequestException('Автор не найден');
    }
  
    // Проверяем, что у пользователя есть аватар и это не дефолтный аватар
    if (album.avatar && album.avatar !== 'avatar_default.png') {
      try {
        const filePath = path.join('./album_avatar', album.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар удален: ${filePath}`);
      } catch (error) {
        // Логируем ошибку, но не прерываем процесс, чтобы пользователь все равно был удален
        console.error(`Ошибка при удалении аватара: ${error}`);
      }
    }
  
    const result = await this.albumRepository.delete(albumId);
  }
}
