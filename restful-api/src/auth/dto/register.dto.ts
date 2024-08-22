import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';
import dayjs from 'dayjs';
import { Gender } from 'src/user/user.service';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsIn([], {
    message: 'Date of Birth must be in the format YYYY-MM-DD and valid',
  })
  @ValidateIf((o) => !dayjs(o.dateOfBirth, 'YYYY-MM-DD', true).isValid())
  dateOfBirth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsBoolean()
  isSubscribed: boolean;

  @IsStrongPassword()
  password: string;

  // This decorator is used as a hack to trigger validation when combined with @ValidateIf.
  // It does not perform actual validation but ensures that the validation logic in @ValidateIf is executed.
  @IsIn([], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o) => o.password !== o.confirmPassword)
  confirmPassword: string;
}
