import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    
    @IsNotEmpty({ message: 'Никнейм не должен быть пустым' })
    @IsString({ message: 'Никнейм должен быть строкой' })
    nickname: string;

    @IsString({ message: 'Пароль должен быть строкой' })
    @Length(6, 20, { message: 'Пароль должен содержать от 6 до 20 символов' })
    password: string;
}
