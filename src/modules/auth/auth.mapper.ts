import { SingInResponse } from '@/modules/auth/dto/sing-in.response';
import { SingUpRequest } from '@/modules/auth/dto/sing-up.request';
import { SingUpResponse } from '@/modules/auth/dto/sing-up.response';
import { CreateUserRequest } from '@/modules/user/dto/create-user.request';
import { User } from '@/modules/user/entities/user.entity';
import { Role } from '@/modules/user/enum/role.enum';
import { plainToClass } from 'class-transformer';

export class AuthMapper {
  static singUpRequestToCreateUserRequest(singUpRequest: SingUpRequest) {
    return plainToClass(CreateUserRequest, {
      ...singUpRequest,
      role: Role.USER,
    });
  }

  static singUpResponse(user: User, token: string) {
    return plainToClass(SingUpResponse, { ...user, token });
  }

  static singInResponse(token: string) {
    return plainToClass(SingInResponse, { token });
  }
}
