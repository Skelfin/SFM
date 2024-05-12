import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UserFormService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: User): Promise<User> {
    if (userData.password.length < 6 || userData.password.length > 20) {
      throw new Error('Пароль должен быть от 6 до 20 символов');
    }
    const hashedPassword = await argon2.hash(userData.password);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new Error('Пользователь не найден');
    }

    const oldAvatarPath = userToUpdate.avatar && userToUpdate.avatar !== 'avatar_default.png' 
    ? path.join('./user_avatar', userToUpdate.avatar) 
    : null;

    if (userData.password) {
      if (userData.password.length < 6 || userData.password.length > 20) {
        throw new Error('Пароль должен быть от 6 до 20 символов');
      }
      userData.password = await argon2.hash(userData.password);
    }
  
    if (userData.avatar) {
      try {
        await this.userRepository.update(id, userData); // Обновляем данные пользователя
        if (oldAvatarPath) {
          await fs.unlink(oldAvatarPath); // Удаляем старый аватар после успешного обновления
          console.log(`Старый аватар удален: ${oldAvatarPath}`);
        }
        return this.userRepository.findOne({ where: { id } });
      } catch (error) {
        console.warn(`Ошибка при обновлении пользователя: ${error}`);
        throw new Error('Ошибка при обновлении данных пользователя');
      }
    } else {
      return this.userRepository.update(id, userData).then(() => this.userRepository.findOne({ where: { id } }));
    }
  }
  
}
