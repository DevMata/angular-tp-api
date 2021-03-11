import { Expose } from 'class-transformer';

export class Product {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  createdAt: Date;
}
