import { User } from '@/modules/user/entities/user.entity';
import { Role } from '@/modules/user/enum/role.enum';
import { UserService } from '@/modules/user/user.service';
import { MockType } from '@/shared/tests/mock-type';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

export function userRepositoryMockFactory(): MockType<Repository<User>> {
  return {
    find: jest.fn().mockReturnValue([userMockFactory()]),
    findOneBy: jest.fn(({ id }: Partial<User>) => userMockFactory({ id })),
    save: jest.fn((user: User) => userMockFactory({ ...user, id: 'any_id' })),
    update: jest.fn().mockReturnValue({ affected: 1 }),
    remove: jest.fn((user: User) =>
      userMockFactory({ ...user, id: undefined }),
    ),
  };
}

export function userServiceMockFactory(): MockType<UserService> {
  return {
    create: jest.fn((createUserDto: User) =>
      Promise.resolve(userMockFactory({ ...createUserDto, id: 'any_id' })),
    ),
    findAll: jest.fn(() => Promise.resolve([userMockFactory()])),
    findOne: jest.fn((id: string) => Promise.resolve(userMockFactory({ id }))),
    update: jest.fn((id: string, updateUserDto: User) =>
      Promise.resolve(userMockFactory({ ...updateUserDto, id })),
    ),
    remove: jest.fn(() => Promise.resolve(userMockFactory({ id: undefined }))),
  };
}

export function userMockFactory(user?: Partial<User>): User {
  return plainToClass(User, {
    id: 'any_id',
    name: 'any_name',
    email: 'exemple@example.com',
    password: '$2b$10$b2EHpqbCP.dJcVb2VzMY9Oo/93Fg/90TLkyLC0Gjxfzuk6uSlHt7i',
    role: Role.ADMIN,
    ...user,
  });
}

export function createUserRequestMockFactory(user?: Partial<User>): User {
  return plainToClass(User, {
    name: 'any_name',
    email: 'exemple@example.com',
    password: '12Ab!@#$',
    role: Role.ADMIN,
    ...user,
  });
}

export function updateUserRequestMockFactory(user?: Partial<User>): User {
  return plainToClass(User, {
    name: 'any_name',
    email: 'exemple@example.com',
    password: '12Ab!@#$',
    role: Role.ADMIN,
    ...user,
  });
}
