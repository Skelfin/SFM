import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsModule } from './playlists/playlists.module';
import { TracksModule } from './tracks/tracks.module';
import { AuthorModule } from './author/author.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UserModule, TracksModule, AlbumsModule, AuthorModule, PlaylistsModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync({ 
    imports: [ConfigModule], useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
     }),
     inject: [ConfigService],
   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
