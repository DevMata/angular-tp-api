import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  take?: number = 10;

  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number = 1;
}
