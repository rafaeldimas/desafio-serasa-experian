import { Role } from '@/modules/user/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'exemple@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    example: Role.USER,
    enum: Role,
  })
  role: Role;
}
