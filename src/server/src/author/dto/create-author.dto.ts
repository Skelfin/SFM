import { IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    nickname: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    avatar?: string;
}
