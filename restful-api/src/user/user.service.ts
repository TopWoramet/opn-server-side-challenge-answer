import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import dayjs from 'dayjs';

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  isSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  emailExists(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dateOfBirth = dayjs(user.dateOfBirth);
    const today = dayjs();
    const age = today.diff(dateOfBirth, 'year');

    return { ...user, age, password: undefined };
  }

  addUser(user: User): void {
    if (this.emailExists(user.email)) {
      throw new BadRequestException('User with this email already exists');
    }
    this.users.push(user);
  }

  updateUser(id: string, body: UpdateUserDto): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, { ...body, updatedAt: new Date() });

    return { ...user, password: undefined };
  }

  removeUser(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1);
  }
}
