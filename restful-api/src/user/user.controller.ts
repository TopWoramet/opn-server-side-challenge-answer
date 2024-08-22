import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { AuthenticatedRequestDto } from 'src/auth/dto/authenticated-request.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Request() req: AuthenticatedRequestDto) {
    return this.userService.findById(req.user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Request() req: AuthenticatedRequestDto, @Body() body: UpdateDto) {
    return this.userService.updateUser(req.user.id, body);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Request() req: AuthenticatedRequestDto) {
    return this.userService.removeUser(req.user.id);
  }
}
