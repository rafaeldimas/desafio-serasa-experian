import { AuthMapper } from '@/modules/auth/auth.mapper';
import { SingInRequest } from '@/modules/auth/dto/sing-in.request';
import { SingInResponse } from '@/modules/auth/dto/sing-in.response';
import { SingUpRequest } from '@/modules/auth/dto/sing-up.request';
import { SingUpResponse } from '@/modules/auth/dto/sing-up.response';
import { Token } from '@/modules/auth/dto/token.dto';
import { UserService } from '@/modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(singUpRequest: SingUpRequest): Promise<SingUpResponse> {
    const user = await this.userService.create(
      AuthMapper.singUpRequestToCreateUserRequest(singUpRequest),
    );
    const payload: Token = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return AuthMapper.singUpResponse(user, token);
  }

  async singIn(singInRequest: SingInRequest): Promise<SingInResponse> {
    const user = await this.userService.findByEmail(singInRequest.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      singInRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: Token = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return AuthMapper.singInResponse(token);
  }
}
