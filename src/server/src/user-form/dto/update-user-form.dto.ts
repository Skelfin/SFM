import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFormDto } from './create-user-form.dto';

export class UpdateUserFormDto extends PartialType(CreateUserFormDto) {}
