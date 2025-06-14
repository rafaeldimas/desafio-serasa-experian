import { CreateUserRequest } from '@/modules/user/dto/create-user.request';
import { UpdateUserRequest } from '@/modules/user/dto/update-user.request';
import { UserResponse } from '@/modules/user/dto/user.response';
import { User } from '@/modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

export class UserMapper {
  static entityToResponse(user: User): UserResponse {
    return plainToClass(UserResponse, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }

  static entitiesToResponse(users: User[]): UserResponse[] {
    return users.map((user) => UserMapper.entityToResponse(user));
  }

  static requestToEntity(request: CreateUserRequest | UpdateUserRequest): User {
    const partialEntity: Partial<User> = {};

    if (request.name) {
      partialEntity.name = request.name;
    }

    if (request.email) {
      partialEntity.email = request.email;
    }

    if (request.password) {
      partialEntity.password = bcrypt.hashSync(request.password, 10);
    }

    if (request.role) {
      partialEntity.role = request.role;
    }

    return plainToClass(User, partialEntity);
  }
}
