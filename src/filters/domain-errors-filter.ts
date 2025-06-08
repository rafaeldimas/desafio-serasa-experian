import { DomainError } from '@/errors/domain-error';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(DomainError)
export class DomainErrorsFilter implements ExceptionFilter<DomainError> {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(HttpStatus.BAD_REQUEST).json({
      message: exception.getMessage(),
      errorCode: exception.getCode(),
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
