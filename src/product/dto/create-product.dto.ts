import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
}
