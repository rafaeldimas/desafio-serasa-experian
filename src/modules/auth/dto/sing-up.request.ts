import { CreateUserRequest } from '@/modules/user/dto/create-user.request';
import { OmitType } from '@nestjs/swagger';

export class SingUpRequest extends OmitType(CreateUserRequest, ['role']) {}
