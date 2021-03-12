import { Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Login } from './doc/login.doc';

@Injectable()
export class AuthService {
  private readonly refreshTokensSecret: string;
  private readonly refreshTokensLifetime: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.refreshTokensSecret = process.env.REFRESH_TOKENS_SECRET || 'r€fr€$h';
    this.refreshTokensLifetime = process.env.REFRESH_TOKEN_LIFETIME || '14400s';
  }

  signRefreshToken(payload: any): string {
    const { refreshTokensSecret, refreshTokensLifetime: expiresIn } = this;

    return sign(payload, refreshTokensSecret, { expiresIn });
  }

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

  login(user: { id: number; name: string; email: string }): Login {
    const { id: sub, name: username, email } = user;
    const payload = { sub, username, email };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.signRefreshToken(payload),
    };
  }
}
