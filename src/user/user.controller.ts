import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { User as UserDoc } from './doc/user.doc';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Signup } from '../auth/doc/signup.doc';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: number): Promise<UserDoc> {
    return this.userService.getUser(userId);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto): Promise<Signup> {
    return this.userService.createUser(createUser);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUser);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  deleteUser(@Param('userId') userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
