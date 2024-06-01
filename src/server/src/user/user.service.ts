import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { promises as fs } from 'fs';
import * as path from 'path';
import { PlaylistsService } from 'src/playlists/playlists.service';
import { CreatePlaylistDto } from 'src/playlists/dto/create-playlist.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly playlistsService: PlaylistsService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const existUser = await this.userRepository.findOne({
      where: {
        nickname: createUserDto.nickname,
      },
    });
    if (existUser) throw new BadRequestException('Такой пользователь уже есть');

    const existUserByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUserByEmail) throw new BadRequestException('Пользователь с таким email уже существует',);

    if (
      createUserDto.password.length < 6 ||
      createUserDto.password.length > 20
    ) {
      throw new BadRequestException('Пароль должен быть от 6 до 20 символов');
    }

    const user = await this.userRepository.save({
      nickname: createUserDto.nickname,
      email: createUserDto.email,
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
    });
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

  async sendPasswordReset(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Пользователя с таким email не существует');
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now
    await this.userRepository.save(user);

    const resetUrl = `http://localhost:4200/reset/password/${token}`;
    
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset',
      template: 'password-reset',
      context: {
        name: user.nickname,
        resetUrl,
      },
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { resetToken: token, resetTokenExpires: MoreThan(new Date()) },
    });
  
    if (!user) {
      throw new BadRequestException('Токен недействителен или срок его действия истек');
    }
  
    user.password = await argon2.hash(newPassword);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await this.userRepository.save(user);
  }

}
