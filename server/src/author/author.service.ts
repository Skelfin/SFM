import { BadRequestException, Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async createAuthor(authorData: Author): Promise<Author> {
    const newAuthor = this.authorRepository.create(authorData);
    await this.authorRepository.save(newAuthor);
    return newAuthor;
  }

  async updateAuthor(id: number, authorData: Partial<Author>): Promise<Author> {
    const authorToUpdate = await this.authorRepository.findOne({
      where: { id },
    });
    if (!authorToUpdate) {
      throw new Error('Пользователь не найден');
    }

    // Если обновляется аватар, удаляем старый файл
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

    await this.authorRepository.update(id, authorData);
    return this.authorRepository.findOne({ where: { id } });
  }

  async getAuthor(): Promise<Author[]> {
    return await this.authorRepository.find({
      relations: ['albums'],
    });
  }

  async deleteAuthor(authorId: number): Promise<void> {
    const author = await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
    });
  
    if (!author) {
      throw new BadRequestException('Автор не найден');
    }
  
    // Проверяем, что у пользователя есть аватар и это не дефолтный аватар
    if (author.avatar && author.avatar !== 'avatar_default.png') {
      try {
        const filePath = path.join('./author_avatar', author.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар удален: ${filePath}`);
      } catch (error) {
        // Логируем ошибку, но не прерываем процесс, чтобы пользователь все равно был удален
        console.error(`Ошибка при удалении аватара: ${error}`);
      }
    }
  
    // Удаляем пользователя после обработки его аватара
    const result = await this.authorRepository.delete(authorId);
  }
}
