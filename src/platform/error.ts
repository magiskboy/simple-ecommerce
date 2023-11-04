import { HttpException } from '@nestjs/common';

export class ServiceError extends Error {
  constructor(
    message?: string,
    private origin?: Error,
    private httpError?: HttpException,
  ) {
    super(message);
  }

  toJSON(): any {
    return {
      name: this.name,
      message: this.message || this.origin?.toString(),
    };
  }

  throwHttpError() {
    if (this.httpError) {
      throw this.httpError;
    }
  }
}
