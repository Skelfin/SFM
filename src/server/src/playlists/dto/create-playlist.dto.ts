import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    @IsString({ message: 'Название должно быть строкой' })
    name: string;
  
    @IsOptional()
    @IsString({ message: 'Аватар должен быть строкой' })
    avatar?: string;
  
    @IsOptional()
    @IsString({ message: 'Описание должно быть строкой' })
    description?: string;
  }
