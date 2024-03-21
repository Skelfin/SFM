import { Controller, Post, Body } from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { User } from 'src/user/entities/user.entity';

@Controller('user-form')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Post()
  async createUser(@Body() userData: User) {
    return this.userFormService.createUser(userData);
  }
}
