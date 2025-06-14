import { Role } from '@/modules/auth/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({
    type: 'string',
    description: 'User name',
    example: 'John Doe',
    required: true,
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'User email',
    example: 'exemple@example.com',
    required: true,
    format: 'email',
  })
  @IsNotEmpty()
  @IsString()
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
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'User role',
    example: 'admin',
    required: true,
    enum: Role,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
