import { Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ id: number; name: string; email: string }> {
    const user = await this.userService.findUserByEmail(email);
    if (user && compareSync(password, user.password)) {
      const { id, name, email } = user;
      return { id, name, email };
    }
    return null;
  }

  async login(user: { id: number; name: string; email: string }) {
    const { id: sub, name: username, email } = user;
    const payload = { sub, username, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
