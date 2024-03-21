import { Module } from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { UserFormController } from './user-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserFormController],
  providers: [UserFormService],
})
export class UserFormModule {}
