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
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
  });

  describe('singIn', () => {
    let singInRequest: SingInRequest;
    let singInResponse: SingInResponse;

    beforeAll(async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      singInRequest = singInRequestMockFactory();
      singInResponse = await controller.singIn(singInRequest);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return a SingInResponse', () => {
      expect(singInResponse).toBeInstanceOf(SingInResponse);
    });

    it('returns the same token', () => {
      expect(singInResponse.token).toEqual('any_token');
    });
  });

  describe('singUp', () => {
    let singUpRequest: SingUpRequest;
    let singUpResponse: SingUpResponse;

    beforeAll(async () => {
      singUpRequest = singUpRequestMockFactory();
      singUpResponse = await controller.singUp(singUpRequest);
    });

    it('should return a SingUpResponse', () => {
      expect(singUpResponse).toBeInstanceOf(SingUpResponse);
    });

    it('returns the same name', () => {
      expect(singUpResponse.name).toEqual(singUpRequest.name);
    });

    it('returns the same email', () => {
      expect(singUpResponse.email).toEqual(singUpRequest.email);
    });

    it('returns the same token', () => {
      expect(singUpResponse.token).toEqual('any_token');
    });

    it('returns the same role', () => {
      expect(singUpResponse.role).toEqual(Role.USER);
    });

    it('returns the same id', () => {
      expect(singUpResponse.id).toEqual('any_id');
    });
  });
});
