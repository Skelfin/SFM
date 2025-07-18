import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'nickname' })
  }

  async validate(nickname: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(nickname, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}