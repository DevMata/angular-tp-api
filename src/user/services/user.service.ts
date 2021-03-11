import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { Signup } from '../../auth/doc/signup.doc';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  users = [
    { id: 1, username: 'user1', password: 'p@ssw0rd' },
    { id: 2, username: 'user2', password: 'p@ssw0rd' },
    { id: 3, username: 'user3', password: 'p@ssw0rd' },
    { id: 4, username: 'user4', password: 'p@ssw0rd' },
  ];

  async findOne(
    username: string,
  ): Promise<{ id: number; username: string; password: string } | undefined> {
    return this.users.find(user => user.username === username);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('The user does not exist.');
    }
    return user;
  }

  async createUser(createUser: CreateUserDto): Promise<Signup> {
    const { password, passwordConfirmation, ...userRest } = createUser;
    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        `password and password confirmation don't match`,
      );
    }

    const newUser = await this.userRepository.save({
      ...userRest,
      password: hashSync(password),
    });

    return plainToClass(Signup, newUser, { excludeExtraneousValues: true });
  }

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.getUser(userId);
    return this.userRepository.save({ ...user, ...updateUser });
  }

  async deleteUser(userId): Promise<void> {
    await this.getUser(userId);
    await this.userRepository.delete(userId);
  }
}
