import _ from 'lodash';
import type { Request } from 'express';

const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  page: 0,
  perPage: 10,
  sortBy: 'updatedAt',
  sortType: 'desc',
};

export function getPaginationParams(
  patched?: Partial<PaginationParams>,
): PaginationParams {
  if (!patched) return DEFAULT_PAGINATION_PARAMS;
  return _.merge(patched, DEFAULT_PAGINATION_PARAMS);
}

export function getPaginationParamsFromRequest(
  request: Request,
): PaginationParams {
  return _.get(request.query, ['page', 'perPage', 'sortBy', 'sortType']);
}
