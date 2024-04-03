import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getTracks(): Promise<Track[]> {
    return await this.trackRepository.find({ relations: ['album', 'playlists'] });
  }

  async deletePlaylist(trackId: number): Promise<void> {
    const result = await this.trackRepository.delete(trackId);
    if (result.affected === 0) {
      throw new BadRequestException('Трек не найден');
    }
  }
}
