import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";


@Injectable()
export class UserFormService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: User): Promise<User> {
    const hashedPassword = await argon2.hash(userData.password);
    const newUser = this.userRepository.create({ ...userData, password: hashedPassword });
    await this.userRepository.save(newUser);
    return newUser;
  }
}

