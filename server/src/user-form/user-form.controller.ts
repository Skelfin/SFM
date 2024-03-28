import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { User } from 'src/user/entities/user.entity';

@Controller('user-form')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Post()
  async createUser(@Body() userData: User) {
    return this.userFormService.createUser(userData);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: Partial<User>) {
    return this.userFormService.updateUser(id, userData);
  }
}
