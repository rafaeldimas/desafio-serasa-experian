import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalErrorsFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger(GlobalErrorsFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      errorCode: 'INTERNAL_SERVER_ERROR',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
