import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { promises as fs } from 'fs';
import * as path from 'path';
import { PlaylistsService } from 'src/playlists/playlists.service';
import { CreatePlaylistDto } from 'src/playlists/dto/create-playlist.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly playlistsService: PlaylistsService,
  ) { }

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const existUser = await this.userRepository.findOne({
      where: {
        nickname: createUserDto.nickname
      },
    })
    if (existUser) throw new BadRequestException('Такой пользователь уже есть')
    if (createUserDto.password.length < 6 || createUserDto.password.length > 20) {
      throw new BadRequestException('Пароль должен быть от 6 до 20 символов');
    }

    const user = await this.userRepository.save({
      nickname: createUserDto.nickname,
      password: await argon2.hash(createUserDto.password),
      access_rights: 0,
      avatar: file ? `${file.filename}` : 'avatar_default.png',
    });

    const createPlaylistDto: CreatePlaylistDto = {
      name: 'Любимые треки',
      avatar: 'favorite.png',
    };
    await this.playlistsService.create(user.id, createPlaylistDto);

    const token = this.jwtService.sign({ nickname: createUserDto.nickname });

    return { user, token };
  }

  async findOne(nickname: string) {
    return await this.userRepository.findOne({
      where: {
        nickname,
      },
    })
  }
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    return user;
  }
  
  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  
    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }
  
    // Проверяем, что у пользователя есть аватар и это не дефолтный аватар
    if (user.avatar && user.avatar !== 'avatar_default.png') {
      try {
        const filePath = path.join('./user_avatar', user.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар удален: ${filePath}`);
      } catch (error) {
        // Логируем ошибку, но не прерываем процесс, чтобы пользователь все равно был удален
        console.error(`Ошибка при удалении аватара: ${error}`);
      }
    }
  
    // Удаляем пользователя после обработки его аватара
    const result = await this.userRepository.delete(userId);
  }

}
