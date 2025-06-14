/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CreateUserRequest } from '@/modules/user/dto/create-user.request';
import { UpdateUserRequest } from '@/modules/user/dto/update-user.request';
import { User } from '@/modules/user/entities/user.entity';
import { UserNotFound } from '@/modules/user/errors/user-not-found';
import {
  createUserRequestMockFactory,
  updateUserRequestMockFactory,
  userMockFactory,
  userRepositoryMockFactory,
} from '@/modules/user/mocks/factories.mock';
import { UserMapper } from '@/modules/user/user.mapper';
import { MockType } from '@/shared/tests/mock-type';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: MockType<Repository<User>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: userRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<MockType<Repository<User>>>(
      getRepositoryToken(User),
    );
  });

  describe('create', () => {
    let user: User;
    let createUserRequest: CreateUserRequest;

    beforeAll(async () => {
      createUserRequest = createUserRequestMockFactory();
      user = await service.create(createUserRequest);
    });

    it('returns a User', () => {
      expect(user).toBeInstanceOf(User);
    });

    it('returns a User with the same name', () => {
      expect(user.name).toBe(createUserRequest.name);
    });

    it('returns a User with the same email', () => {
      expect(user.email).toBe(createUserRequest.email);
    });

    it('returns a User with the password', () => {
      expect(user.password).toBeDefined();
    });

    it('returns a User with the same role', () => {
      expect(user.role).toBe(createUserRequest.role);
    });

    it('calls the repository', () => {
      expect(repository.save).toHaveBeenCalledWith({
        ...UserMapper.requestToEntity(createUserRequest),
        password: expect.any(String),
      });
    });
  });

  describe('findAll', () => {
    let users: User[];
    let usersMock: User[];

    beforeAll(async () => {
      usersMock = [userMockFactory(), userMockFactory()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(usersMock);
      users = await service.findAll();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('returns a list of users equal to 2', () => {
      expect(users.length).toEqual(2);
    });

    it('returns a list of users equal to usersMock', () => {
      expect(users).toEqual(usersMock);
    });
  });

  describe('findOne', () => {
    describe('when finding a user', () => {
      let user: User;
      let userMock: User;

      beforeAll(async () => {
        userMock = userMockFactory();
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(userMock);
        user = await service.findOne(userMock.id);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('returns a user equal to userMock', () => {
        expect(user).toEqual(userMock);
      });
    });

    describe('when finding a user that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: UserNotFound;

      beforeAll(async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

        try {
          await service.findOne(id);
        } catch (err) {
          error = err as UserNotFound;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a UserNotFound', () => {
        expect(error).toBeInstanceOf(UserNotFound);
      });

      it('throws a UserNotFound with the correct message', () => {
        expect(error.getMessage()).toEqual(`User id (${id}) not found`);
      });

      it('throws a UserNotFound with the correct code', () => {
        expect(error.getCode()).toEqual('USER_NOT_FOUND');
      });
    });
  });

  describe('update', () => {
    describe('when updating a user', () => {
      let user: User;
      let updateUserRequest: UpdateUserRequest;

      beforeAll(async () => {
        updateUserRequest = updateUserRequestMockFactory();
        user = await service.update(userMockFactory().id, updateUserRequest);
      });

      it('returns a User', () => {
        expect(user).toBeInstanceOf(User);
      });

      it('returns a User with the same name', () => {
        expect(user.name).toBe(updateUserRequest.name);
      });

      it('returns a User with the same email', () => {
        expect(user.email).toBe(updateUserRequest.email);
      });

      it('returns a User with the same role', () => {
        expect(user.role).toBe(updateUserRequest.role);
      });

      it('calls the repository', () => {
        expect(repository.save).toHaveBeenCalledWith({
          ...UserMapper.requestToEntity(updateUserRequest),
          password: expect.any(String),
        });
      });
    });

    describe('when updating a user that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: UserNotFound;

      beforeAll(async () => {
        jest.spyOn(repository, 'update').mockResolvedValueOnce({ affected: 0 });

        try {
          await service.update(id, updateUserRequestMockFactory());
        } catch (err) {
          error = err as UserNotFound;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a UserNotFound', () => {
        expect(error).toBeInstanceOf(UserNotFound);
      });

      it('throws a UserNotFound with the correct message', () => {
        expect(error.getMessage()).toEqual(`User id (${id}) not found`);
      });

      it('throws a UserNotFound with the correct code', () => {
        expect(error.getCode()).toEqual('USER_NOT_FOUND');
      });
    });
  });
});
