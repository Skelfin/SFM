import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    avatar?: string;
  
    @IsOptional()
    @IsInt()
    year?: number;
}
