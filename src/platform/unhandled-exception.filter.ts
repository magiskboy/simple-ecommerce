import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class UnhandledExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
