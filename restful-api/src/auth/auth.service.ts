import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from './dto/authenticated-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { RegisterUserDto } from './dto/register-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, ...rest }: RegisterUserDto) {
    const isEmailExists = this.userService.emailExists(rest.email);
    if (isEmailExists) {
      throw new BadRequestException('Email exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const currentDate = new Date();
    delete rest.confirmPassword;
    const user: User = {
      ...rest,
      id: uuidv4(),
      password: hashedPassword,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    this.userService.addUser(user);

    return { ...user, password: undefined };
  }

  async login(user: AuthenticatedUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email' | 'id'>> {
    const user = await this.validateUserCredentials(email, password);
    return { email: user.email, id: user.id };
  }

  async changePassword(email: string, body: ChangePasswordDto) {
    const user = await this.validateUserCredentials(email, body.password);
    const hashedNewPassword = await this.hashPassword(body.newPassword);
    const isSameAsCurrentPassword = await this.comparePasswords(
      body.newPassword,
      user.password,
    );
    if (isSameAsCurrentPassword) {
      throw new BadRequestException(
        'New password cannot be the same as the current password',
      );
    }

    user.password = hashedNewPassword;
    user.updatedAt = new Date();

    return { ...user, password: undefined };
  }

  private async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = this.userService.findByEmail(email);
    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
