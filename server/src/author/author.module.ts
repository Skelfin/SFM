import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), TypeOrmModule.forFeature([Album]), TypeOrmModule.forFeature([Track])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
