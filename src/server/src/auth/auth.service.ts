import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }
  async validateUser(nickname: string, password: string) {
    const user = await this.userService.findOne(nickname);
    if (!user) {
      throw new UnauthorizedException('Неверное имя или пароль');
    }
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Неверное имя или пароль')
  }

  async login(user: IUser) {
    const { id, nickname } = user
    return {
      id, nickname, token: this.jwtService.sign({ id: user.id, nickname: user.nickname }),
    }
  }
}
