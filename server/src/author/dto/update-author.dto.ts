import { IsArray, IsInt, IsOptional, ArrayUnique } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Type(() => Number)
    albumIds?: number[];
}
