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
import { User as UserDoc } from '../doc/user.doc';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: number): Promise<UserDoc> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('The user does not exist.');
    }

    return plainToClass(UserDoc, user, { excludeExtraneousValues: true });
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
