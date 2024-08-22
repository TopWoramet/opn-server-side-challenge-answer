import {
  IsIn,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsStrongPassword()
  newPassword: string;

  @IsIn([], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o) => o.newPassword !== o.confirmNewPassword)
  confirmNewPassword: string;
}
