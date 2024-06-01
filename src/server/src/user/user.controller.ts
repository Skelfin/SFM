import { Controller, Post, Get, Delete, Param, Body, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ResetPasswordDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './user_avatar',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, file);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }

  @Post('send-password-reset')
  async sendPasswordReset(@Body() body: { email: string }) {
    return this.userService.sendPasswordReset(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }
}
