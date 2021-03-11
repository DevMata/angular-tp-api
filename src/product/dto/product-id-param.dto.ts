import { IsInt, IsPositive } from 'class-validator';

export class ProductIdParamDto {
  @IsInt()
  @IsPositive()
  productId: number;
}
