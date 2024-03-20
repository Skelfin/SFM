import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

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
  
}
