import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { AuthenticatedRequestDto } from './dto/authenticated-request.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthenticatedRequestDto) {
    return this.authService.login(req.user);
  }

  @Post('change-password')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  passwordChange(
    @Request() req: AuthenticatedRequestDto,
    @Body() body: ChangePasswordDto,
  ) {
    return this.authService.changePassword(req.user.email, body);
  }
}
