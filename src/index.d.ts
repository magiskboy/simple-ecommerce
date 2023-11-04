import type UserEntity from 'users/user.entity';

export {};

declare global {
  namespace Express {
    interface Request {
      session?: string;
      user?: UserEntity;
    }
  }

  interface PaginationParams {
    page?: number;
    perPage?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  }

  interface PaginationReturnValue<T = any> {
    data: T[];
    pagination: {
      page: number;
      perPage: number;
      total: number;
    };
  }
}
