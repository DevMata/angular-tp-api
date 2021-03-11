import { Expose } from 'class-transformer';

export class Pagination {
  @Expose()
  totalPages!: number | null;

  @Expose()
  itemsPerPage!: number;

  @Expose()
  totalItems!: number | null;

  @Expose()
  currentPage!: number;

  @Expose()
  nextPage!: number | null;

  @Expose()
  previousPage!: number | null;
}
