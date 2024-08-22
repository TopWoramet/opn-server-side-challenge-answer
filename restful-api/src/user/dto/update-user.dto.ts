import { OmitType } from '@nestjs/mapped-types';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';

export class UpdateUserDto extends OmitType(RegisterUserDto, [
  'password',
  'confirmPassword',
  'email',
  'name',
]) {}
