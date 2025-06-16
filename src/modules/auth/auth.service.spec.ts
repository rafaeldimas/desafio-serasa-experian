import { AuthMapper } from '@/modules/auth/auth.mapper';
import { SingInRequest } from '@/modules/auth/dto/sing-in.request';
import { SingInResponse } from '@/modules/auth/dto/sing-in.response';
import { SingUpRequest } from '@/modules/auth/dto/sing-up.request';
import { SingUpResponse } from '@/modules/auth/dto/sing-up.response';
import {
  jwtServiceMockFactory,
  singInRequestMockFactory,
  singUpRequestMockFactory,
} from '@/modules/auth/mocks/factories.mock';
import { Role } from '@/modules/user/enum/role.enum';
import { userServiceMockFactory } from '@/modules/user/mocks/factories.mock';
import { UserService } from '@/modules/user/user.service';
import { MockType } from '@/shared/tests/mock-type';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: MockType<UserService>;
  let jwtService: MockType<JwtService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useFactory: userServiceMockFactory,
        },
        {
          provide: JwtService,
          useFactory: jwtServiceMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<MockType<UserService>>(UserService);
    jwtService = module.get<MockType<JwtService>>(JwtService);
  });

  describe('singUp', () => {
    let singUpResponse: SingUpResponse;
    let singUpRequest: SingUpRequest;

    beforeAll(async () => {
      singUpRequest = singUpRequestMockFactory();
      singUpResponse = await service.singUp(singUpRequest);
    });

    it('should return a SingUpResponse', () => {
      expect(singUpResponse).toBeInstanceOf(SingUpResponse);
    });

    it('should call userService.create', () => {
      expect(userService.create).toHaveBeenCalledWith(
        AuthMapper.singUpRequestToCreateUserRequest(singUpRequest),
      );
    });

    it('should call jwtService.sign', () => {
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: singUpResponse.id,
      });
    });

    it('returns the same name', () => {
      expect(singUpResponse.name).toEqual(singUpRequest.name);
    });

    it('returns the same email', () => {
      expect(singUpResponse.email).toEqual(singUpRequest.email);
    });

    it('returns the same role', () => {
      expect(singUpResponse.role).toEqual(Role.USER);
    });

    it('returns the same token', () => {
      expect(singUpResponse.token).toEqual('any_token');
    });
  });

  describe('singIn', () => {
    describe('when singIn', () => {
      let singInRequest: SingInRequest;
      let singInResponse: SingInResponse;

      beforeAll(async () => {
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

        singInRequest = singInRequestMockFactory();
        singInResponse = await service.singIn(singInRequest);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('should return a SingInResponse', () => {
        expect(singInResponse).toBeInstanceOf(SingInResponse);
      });

      it('should call userService.findByEmail', () => {
        expect(userService.findByEmail).toHaveBeenCalledWith(
          singInRequest.email,
        );
      });

      it('should call bcrypt.compare', () => {
        expect(bcrypt.compare).toHaveBeenCalledWith(
          singInRequest.password,
          '$2b$10$b2EHpqbCP.dJcVb2VzMY9Oo/93Fg/90TLkyLC0Gjxfzuk6uSlHt7i',
        );
      });

      it('should call jwtService.sign', () => {
        expect(jwtService.sign).toHaveBeenCalledWith({
          sub: 'any_id',
        });
      });

      it('returns the same token', () => {
        expect(singInResponse.token).toEqual('any_token');
      });
    });
  });

  describe('when singIn with invalid credentials', () => {
    let error: UnauthorizedException;

    beforeAll(async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
      try {
        await service.singIn(singInRequestMockFactory());
      } catch (e) {
        error = e as UnauthorizedException;
      }
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should throw UnauthorizedException', () => {
      expect(error).toBeInstanceOf(UnauthorizedException);
    });

    it('should throw UnauthorizedException with the correct message', () => {
      expect(error.message).toEqual('Invalid credentials');
    });
  });

  describe('when singIn with user not found', () => {
    let error: UnauthorizedException;

    beforeAll(async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);
      try {
        await service.singIn(singInRequestMockFactory());
      } catch (e) {
        error = e as UnauthorizedException;
      }
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should throw UnauthorizedException', () => {
      expect(error).toBeInstanceOf(UnauthorizedException);
    });

    it('should throw UnauthorizedException with the correct message', () => {
      expect(error.message).toEqual('Invalid credentials');
    });
  });
});
