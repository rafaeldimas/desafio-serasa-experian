import { CreateUserRequest } from '@/modules/user/dto/create-user.request';
import { UserResponse } from '@/modules/user/dto/user.response';
import {
  createUserRequestMockFactory,
  userServiceMockFactory,
} from '@/modules/user/mocks/factories.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: userServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('create', () => {
    let userResponse: UserResponse;
    let createUserRequest: CreateUserRequest;

    beforeAll(async () => {
      createUserRequest = createUserRequestMockFactory();
      userResponse = await controller.create(createUserRequest);
    });

    it('returns a UserResponse', () => {
      expect(userResponse).toBeInstanceOf(UserResponse);
    });

    it('returns a UserResponse with the id', () => {
      expect(userResponse).toHaveProperty('id');
    });

    it('returns a UserResponse with the name', () => {
      expect(userResponse).toHaveProperty('name');
    });

    it('returns a UserResponse with the email', () => {
      expect(userResponse).toHaveProperty('email');
    });

    it('returns a UserResponse with the role', () => {
      expect(userResponse).toHaveProperty('role');
    });
  });

  describe('findAll', () => {
    let usersResponse: UserResponse[];

    beforeAll(async () => {
      usersResponse = await controller.findAll();
    });

    it('returns a list of UserResponse', () => {
      expect(usersResponse).toBeInstanceOf(Array);
      usersResponse.forEach((user) => {
        expect(user).toBeInstanceOf(UserResponse);
      });
    });
  });

  describe('findOne', () => {
    let userResponse: UserResponse;
    const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';

    beforeAll(async () => {
      userResponse = await controller.findOne(id);
    });

    it('returns a UserResponse', () => {
      expect(userResponse).toBeInstanceOf(UserResponse);
    });

    it('returns a UserResponse with the same id', () => {
      expect(userResponse.id).toEqual(id);
    });
  });

  describe('update', () => {
    let userResponse: UserResponse;
    const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
    let updateUserRequestMock: CreateUserRequest;

    beforeAll(async () => {
      updateUserRequestMock = createUserRequestMockFactory();
      userResponse = await controller.update(id, updateUserRequestMock);
    });

    it('returns a UserResponse', () => {
      expect(userResponse).toBeInstanceOf(UserResponse);
    });

    it('returns a UserResponse with the same id', () => {
      expect(userResponse.id).toEqual(id);
    });
  });

  describe('remove', () => {
    let userResponse: UserResponse;
    const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';

    beforeAll(async () => {
      userResponse = await controller.remove(id);
    });

    it('returns a UserResponse', () => {
      expect(userResponse).toBeInstanceOf(UserResponse);
    });

    it('returns a UserResponse with the id', () => {
      expect(userResponse.id).toBeUndefined();
    });
  });
});
