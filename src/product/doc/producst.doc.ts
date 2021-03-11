import { Product } from './product.doc';
import { Pagination } from '../../core/doc/pagination.doc';
import { Expose, Type } from 'class-transformer';

export class Products {
  @Type(() => Product)
  @Expose()
  products: Product[];

  @Type(() => Pagination)
  @Expose()
  pagination: Pagination;
}
