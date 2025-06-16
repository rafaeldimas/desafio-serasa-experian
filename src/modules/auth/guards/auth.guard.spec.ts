import {
  configServiceMockFactory,
  executionContextMockFactory,
  jwtServiceMockFactory,
  reflectorMockFactory,
} from '@/modules/auth/mocks/factories.mock';
import { userServiceMockFactory } from '@/modules/user/mocks/factories.mock';
import { UserService } from '@/modules/user/user.service';
import { MockType } from '@/shared/tests/mock-type';
import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: MockType<JwtService>;
  let userService: MockType<UserService>;
  let reflector: MockType<Reflector>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useFactory: jwtServiceMockFactory,
        },
        {
          provide: UserService,
          useFactory: userServiceMockFactory,
        },
        {
          provide: ConfigService,
          useFactory: configServiceMockFactory,
        },
        {
          provide: Reflector,
          useFactory: reflectorMockFactory,
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<MockType<JwtService>>(JwtService);
    userService = module.get<MockType<UserService>>(UserService);
    reflector = module.get<MockType<Reflector>>(Reflector);
  });

  describe('when the route is public', () => {
    let result: boolean;

    beforeAll(async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(true);

      result = await guard.canActivate(
        executionContextMockFactory({
          headers: {
            authorization: 'Bearer any_token',
          },
        }) as ExecutionContext,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return true', () => {
      expect(result).toBe(true);
    });

    it('should not call verifyAsync', () => {
      expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('should not call userService.findOne', () => {
      expect(userService.findOne).not.toHaveBeenCalled();
    });
  });

  describe('when the token is not provided', () => {
    let result: boolean;

    beforeAll(async () => {
      result = await guard.canActivate(
        executionContextMockFactory() as ExecutionContext,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return false', () => {
      expect(result).toBe(false);
    });

    it('should not call verifyAsync', () => {
      expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('should not call userService.findOne', () => {
      expect(userService.findOne).not.toHaveBeenCalled();
    });
  });

  describe('when the token is provided', () => {
    let result: boolean;

    beforeAll(async () => {
      result = await guard.canActivate(
        executionContextMockFactory({
          headers: {
            authorization: 'Bearer any_token',
          },
        }) as ExecutionContext,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return true', () => {
      expect(result).toBe(true);
    });

    it('should call verifyAsync', () => {
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('any_token', {
        secret: 'any_secret',
      });
    });

    it('should call userService.findOne', () => {
      expect(userService.findOne).toHaveBeenCalledWith('any_id');
    });
  });

  describe('when the token is invalid', () => {
    let result: boolean;

    beforeAll(async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error());

      result = await guard.canActivate(
        executionContextMockFactory({
          headers: {
            authorization: 'Bearer any_token',
          },
        }) as ExecutionContext,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return false', () => {
      expect(result).toBe(false);
    });

    it('should call verifyAsync', () => {
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('any_token', {
        secret: 'any_secret',
      });
    });

    it('should not call userService.findOne', () => {
      expect(userService.findOne).not.toHaveBeenCalled();
    });
  });
});
