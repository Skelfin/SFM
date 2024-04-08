import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ArrayUnique, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { Type } from 'class-transformer';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
    @IsOptional() // Делает поле необязательным
    @IsArray({ message: 'Треки должны быть представлены массивом идентификаторов' })
    @ArrayUnique({ message: 'Идентификаторы треков должны быть уникальными' })
    @IsInt({ each: true, message: 'Каждый идентификатор должен быть числом' })
    @Type(() => Number) // Указывает class-transformer преобразовать каждый элемент массива в число
    trackIds?: string[];
}
