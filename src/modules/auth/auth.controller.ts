import { Public } from '@/modules/auth/decorators/public.decorator';
import { SingInRequest } from '@/modules/auth/dto/sing-in.request';
import { SingInResponse } from '@/modules/auth/dto/sing-in.response';
import { SingUpRequest } from '@/modules/auth/dto/sing-up.request';
import { SingUpResponse } from '@/modules/auth/dto/sing-up.response';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sing-in')
  @ApiOkResponse({
    type: SingInResponse,
    description: 'Genarate JWT token user api',
  })
  async singIn(@Body() singInRequest: SingInRequest): Promise<SingInResponse> {
    return await this.authService.singIn(singInRequest);
  }

  @Post('sing-up')
  @ApiOkResponse({ type: SingUpResponse, description: 'Create user api' })
  async singUp(@Body() singUpRequest: SingUpRequest): Promise<SingUpResponse> {
    return await this.authService.singUp(singUpRequest);
  }
}
