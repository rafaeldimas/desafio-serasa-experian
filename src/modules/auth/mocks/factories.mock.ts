import { SingInRequest } from '@/modules/auth/dto/sing-in.request';
import { SingUpRequest } from '@/modules/auth/dto/sing-up.request';
import { User } from '@/modules/user/entities/user.entity';
import { MockType } from '@/shared/tests/mock-type';
import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { IncomingHttpHeaders } from 'http';

export function jwtServiceMockFactory(): MockType<JwtService> {
  return {
    sign: jest.fn().mockReturnValue('any_token'),
    verifyAsync: jest.fn().mockResolvedValue({ sub: 'any_id' }),
  };
}

export function configServiceMockFactory(): MockType<ConfigService> {
  return {
    get: jest.fn().mockReturnValue('any_secret'),
  };
}

export function reflectorMockFactory(): MockType<Reflector> {
  return {
    getAllAndOverride: jest.fn().mockReturnValue(false),
  };
}

interface ExecutionContextMockFactoryParams {
  headers?: IncomingHttpHeaders;
  user?: Partial<User>;
}

export function executionContextMockFactory({
  headers = {},
  user = {},
}: ExecutionContextMockFactoryParams = {}): MockType<ExecutionContext> {
  return {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        user,
        headers,
      }),
    }),
  };
}

export function singInRequestMockFactory(
  singInRequest?: Partial<SingInRequest>,
): SingInRequest {
  return plainToClass(SingInRequest, {
    email: 'any_email',
    password: 'any_password',
    ...singInRequest,
  });
}

export function singUpRequestMockFactory(
  singUpRequest?: Partial<SingUpRequest>,
): SingUpRequest {
  return plainToClass(SingUpRequest, {
    name: 'any_name',
    email: 'exemple@example.com',
    password: '12Ab!@#$',
    ...singUpRequest,
  });
}
