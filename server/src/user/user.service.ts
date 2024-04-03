import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        nickname: createUserDto.nickname
      },
    })
    if (existUser) throw new BadRequestException('Такой пользователь уже есть')
    const user = await this.userRepository.save({
      nickname: createUserDto.nickname,
      password: await argon2.hash(createUserDto.password),
      access_rights: 0,
    })

    const token = this.jwtService.sign({ nickname: createUserDto.nickname })

    return { user, token }
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
    if (user.avatar && user.avatar !== 'Avatar_default.png') {
      try {
        const filePath = path.join('./uploads', user.avatar);
        await fs.unlink(filePath);
        console.log(`Аватар удален: ${filePath}`);
      } catch (error) {
        // Логируем ошибку, но не прерываем процесс, чтобы пользователь все равно был удален
        console.error(`Ошибка при удалении аватара: ${error}`);
      }
    }
  
    // Удаляем пользователя после обработки его аватара
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      // Этот блок кода, возможно, будет излишним, так как проверка наличия пользователя
      // уже проводилась выше, но он обеспечит дополнительную защиту на случай изменений в логике
      throw new BadRequestException('Ошибка при удалении пользователя');
    }
  }

}
