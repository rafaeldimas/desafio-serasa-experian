import { IS_PUBLIC_KEY } from '@/modules/auth/decorators/public.decorator';
import { ROLES_KEY } from '@/modules/auth/decorators/roles.decorator';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import {
  executionContextMockFactory,
  reflectorMockFactory,
} from '@/modules/auth/mocks/factories.mock';
import { Role } from '@/modules/user/enum/role.enum';
import { userMockFactory } from '@/modules/user/mocks/factories.mock';
import { MockType } from '@/shared/tests/mock-type';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: MockType<Reflector>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useFactory: reflectorMockFactory,
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<MockType<Reflector>>(Reflector);
  });

  describe('when the route is public', () => {
    let result: boolean;

    beforeAll(() => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation((key: string) => {
          if (key === IS_PUBLIC_KEY) {
            return true;
          }
        });

      result = guard.canActivate(
        executionContextMockFactory() as ExecutionContext,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return true', () => {
      expect(result).toBe(true);
    });

    it('should calleed reflector.getAllAndOverride once', () => {
      expect(reflector.getAllAndOverride).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the route is not public', () => {
    describe('when the required roles are not provided', () => {
      let result: boolean;

      beforeAll(() => {
        jest
          .spyOn(reflector, 'getAllAndOverride')
          .mockImplementation((key: string) => {
            if (key === IS_PUBLIC_KEY) {
              return false;
            }

            if (key === ROLES_KEY) {
              return undefined;
            }
          });

        result = guard.canActivate(
          executionContextMockFactory() as ExecutionContext,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });

      it('should calleed reflector.getAllAndOverride twice', () => {
        expect(reflector.getAllAndOverride).toHaveBeenCalledTimes(2);
      });
    });

    describe('when the user does not have the required role', () => {
      let result: boolean;

      beforeAll(() => {
        jest
          .spyOn(reflector, 'getAllAndOverride')
          .mockImplementation((key: string) => {
            if (key === IS_PUBLIC_KEY) {
              return false;
            }

            if (key === ROLES_KEY) {
              return [Role.ADMIN];
            }
          });

        result = guard.canActivate(
          executionContextMockFactory({
            user: userMockFactory({ role: Role.USER }),
          }) as ExecutionContext,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });

      it('should calleed reflector.getAllAndOverride twice', () => {
        expect(reflector.getAllAndOverride).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('when the user has the required role', () => {
    let result: boolean;

    beforeAll(() => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation((key: string) => {
          if (key === IS_PUBLIC_KEY) {
            return false;
          }

          if (key === ROLES_KEY) {
            return [Role.USER];
          }
        });

      result = guard.canActivate(
        executionContextMockFactory({
          user: userMockFactory({ role: Role.USER }),
        }) as ExecutionContext,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return true', () => {
      expect(result).toBe(true);
    });

    it('should calleed reflector.getAllAndOverride twice', () => {
      expect(reflector.getAllAndOverride).toHaveBeenCalledTimes(2);
    });
  });
});
