import { OmitType } from '@nestjs/mapped-types';
import { RegisterDto } from '../../auth/dto/register.dto';

export class UpdateDto extends OmitType(RegisterDto, [
  'password',
  'confirmPassword',
  'email',
  'name',
]) {}
