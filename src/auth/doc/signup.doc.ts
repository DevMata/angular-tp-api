import { Expose } from 'class-transformer';

export class Signup {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
