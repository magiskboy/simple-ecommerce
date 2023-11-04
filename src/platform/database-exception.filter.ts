import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class DatabaseExceptionFilter<TypeORMError> implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    throw new InternalServerErrorException();
  }
}
