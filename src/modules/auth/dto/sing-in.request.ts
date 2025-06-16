import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingInRequest {
  @ApiProperty({
    type: 'string',
    description: 'User email',
    example: 'exemple@example.com',
    required: true,
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'User password',
    example: '12Ab!@#$',
    required: true,
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty()
  password: string;
}
