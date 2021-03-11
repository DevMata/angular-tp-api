import { PaginationDto } from '../dto/pagination.dto';
import { Pagination } from '../doc/pagination.doc';

export const getOrmTakeAndSkip = (
  pagination: PaginationDto,
): { take: number; skip: number } => {
  const { take, page } = pagination;
  return { take: take, skip: (page - 1) * take };
};

export const getPagination = (
  pagination: PaginationDto,
  totalItems: number,
): Pagination => {
  const totalPages = Math.ceil(totalItems / pagination.take);
  const nextPage = pagination.page < totalPages ? pagination.page + 1 : null;
  const previousPage =
    pagination.page > 1 && pagination.page <= totalPages
      ? pagination.page - 1
      : null;

  return {
    currentPage: pagination.page,
    itemsPerPage: pagination.take,
    totalItems,
    totalPages,
    previousPage,
    nextPage,
  };
};
