import { Expose } from 'class-transformer';

export class Login {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
