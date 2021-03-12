import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/services/user.service';
import { Signup } from './doc/signup.doc';
import { User } from '../user/doc/user.doc';
import { Login } from './doc/login.doc';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@Request() req): Login {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: RefreshTokenDto): Promise<Login> {
    return this.authService.refresh(refreshToken.refreshToken);
  }

  @Post('signup')
  signUp(@Body() signup: SignUpDto): Promise<Signup> {
    return this.userService.createUser(signup);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req): Promise<User> {
    return this.userService.getUser(req.user.userId);
  }
}
