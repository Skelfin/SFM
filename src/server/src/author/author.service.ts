import { BadRequestException, Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async createAuthor(authorData: Author): Promise<Author> {
    const newAuthor = this.authorRepository.create(authorData);
    await this.authorRepository.save(newAuthor);
    return newAuthor;
  }

  async updateAuthor(id: number, authorData: Partial<UpdateAuthorDto>): Promise<Author> {
    const authorToUpdate = await this.authorRepository.findOne({
      where: { id },
      relations: ['albums']
    });
    if (!authorToUpdate) {
      throw new Error('Пользователь не найден');
    }

    authorToUpdate.nickname = authorData.nickname || authorToUpdate.nickname;
    if (authorData.description !== undefined) {
      authorData.description = authorData.description;
    }

    if (authorData.albumIds) {
      const newAlbums = authorData.albumIds.map(id => ({ id: Number(id) }) as Album);
      authorToUpdate.albums = newAlbums;
    } else {
      authorToUpdate.albums = [];
    }

    if (
      authorData.avatar &&
      authorToUpdate.avatar &&
      authorToUpdate.avatar !== 'avatar_default.png'
    ) {
      const oldAvatarPath = path.join('./author_avatar', authorToUpdate.avatar);
      try {
        await fs.unlink(oldAvatarPath);
        console.log(`Старый аватар удален: ${oldAvatarPath}`);
      } catch (error) {
        console.warn(`Ошибка при удалении старого аватара: ${error}`);
      }
    }

    await this.authorRepository.save(authorToUpdate);
    return this.authorRepository.findOne({ where: { id }, relations: ['albums'] });
  }

  async getAuthor(): Promise<Author[]> {
    return await this.authorRepository.find({
      relations: ['albums'],
    });
  }

  async getAuthorById(id: number): Promise<Author> {
    return this.authorRepository.findOne({
      where: { id: id }, 
      relations: ['albums'], 
    });
  }

  async deleteAuthor(authorId: number): Promise<void> {
    const author = await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
      relations: ['albums'],
    });

    if (!author) {
      throw new BadRequestException('Автор не найден');
    }
    
    for (const album of author.albums) {
      const albumAuthors = await this.albumRepository.createQueryBuilder('album')
        .leftJoinAndSelect('album.authors', 'author')
        .where('album.id = :id', { id: album.id })
        .getOne();
  
      if (albumAuthors.authors.length === 1) {
        // Очищаем связь альбома с треками
        await this.albumRepository.createQueryBuilder()
          .relation(Album, 'tracks')
          .of(album)
          .loadMany()
          .then(async tracks => {
            for (const track of tracks) {
              await this.albumRepository.createQueryBuilder()
                .update(Track)
                .set({ album: null })
                .where('id = :id', { id: track.id })
                .execute();
            }
          });
  
        // Удаляем альбом, если у него не осталось других авторов
        await this.albumRepository.delete(album.id);
      } else {
        // Удаляем только связь с этим автором
        await this.albumRepository.createQueryBuilder()
          .relation(Album, 'authors')
          .of(album)
          .remove(author);
      }
    }

    if (author.avatar && author.avatar !== 'avatar_default.png') {
      try {
        const filePath = path.join('./author_avatar', author.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар удален: ${filePath}`);
      } catch (error) {
        console.error(`Ошибка при удалении аватара: ${error}`);
      }
    }

    await this.authorRepository.delete(authorId);
  }
}
