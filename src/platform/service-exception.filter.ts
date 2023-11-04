import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServiceError, ServiceError } from './error';

@Catch(ServiceError)
export class ServiceExceptionFilter<ServiceError> implements ExceptionFilter {
  catch(exception: ServiceError, host: ArgumentsHost) {

  }
}
