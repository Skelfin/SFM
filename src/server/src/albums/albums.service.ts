import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Author } from 'src/author/entities/author.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async createAlbum(albumData: Album): Promise<Album> {
    const newAlbum = this.albumRepository.create(albumData);
    await this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: number, albumData: Partial<UpdateAlbumDto>): Promise<Album> {
    const albumToUpdate = await this.albumRepository.findOne({
      where: { id },
      relations: ['tracks', 'authors'],
    });
    if (!albumToUpdate) {
      throw new Error('Альбом не найден');
    }

    albumToUpdate.name = albumData.name || albumToUpdate.name;
    albumToUpdate.description = albumData.description || albumToUpdate.description;
    albumToUpdate.year = albumData.year || albumToUpdate.year;

    if (albumData.authorIds) {
      const newAuthor = albumData.authorIds.map(id => ({ id: Number(id) }) as Author);
      albumToUpdate.authors = newAuthor;
    } else {
      albumToUpdate.authors = [];
    }

    if (albumData.trackIds) {
      const newTracks = albumData.trackIds.map(id => ({ id: Number(id) }) as Track);
      albumToUpdate.tracks = newTracks;
    } else {
      albumToUpdate.tracks = [];
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

    if (albumData.avatar) {
      albumToUpdate.avatar = albumData.avatar;
    }

    await this.albumRepository.save(albumToUpdate);
    return this.albumRepository.findOne({ where: { id }, relations: ['tracks', 'authors'] });
  }

  async getAlbum(): Promise<Album[]> {
    return await this.albumRepository.find({
      relations: ['tracks', 'authors'],
    });
  }

  async getAlbumById(id: number): Promise<Album> {
    return this.albumRepository.findOne({
      where: { id: id }, 
      relations: ['tracks', 'authors'], 
    });
  }

  async deleteAlbum(albumId: number): Promise<void> {
    const album = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },relations: ['tracks'],
    });
  
    if (!album) {
      throw new BadRequestException('Альбом не найден');
    }

    if (album.tracks && album.tracks.length) {
      await Promise.all(album.tracks.map(async (track) => {
        track.album = null;
        await this.trackRepository.save(track);
      }));
    }
  
    if (album.avatar && album.avatar !== 'avatar_default.png') {
      try {
        const filePath = path.join('./album_avatar', album.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар удален: ${filePath}`);
      } catch (error) {
        console.error(`Ошибка при удалении аватара: ${error}`);
      }
    }
  
    await this.albumRepository.delete(albumId);
  }
}
