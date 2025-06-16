import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { UserResponse } from '@/modules/user/dto/user.response';
import { Role } from '@/modules/user/enum/role.enum';
import { UserMapper } from '@/modules/user/user.mapper';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user.request';
import { UpdateUserRequest } from './dto/update-user.request';
import { UserService } from './user.service';

@ApiBearerAuth()
@Roles(Role.ADMIN)
@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Only ADMIN', description: 'Create user' })
  @ApiCreatedResponse({ type: UserResponse, description: 'User created' })
  async create(
    @Body() createUserDto: CreateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userService.create(createUserDto);
    return UserMapper.entityToResponse(user);
  }

  @Get()
  @ApiOperation({ summary: 'Only ADMIN', description: 'Find all users' })
  @ApiOkResponse({ type: UserResponse, isArray: true, description: 'Users' })
  async findAll(): Promise<UserResponse[]> {
    const users = await this.userService.findAll();
    return UserMapper.entitiesToResponse(users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Only ADMIN', description: 'Find one user' })
  @ApiOkResponse({ type: UserResponse, description: 'User' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    const user = await this.userService.findOne(id);
    return UserMapper.entityToResponse(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Only ADMIN', description: 'Update user' })
  @ApiOkResponse({ type: UserResponse, description: 'User updated' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userService.update(id, updateUserDto);
    return UserMapper.entityToResponse(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Only ADMIN', description: 'Delete user' })
  @ApiOkResponse({ type: UserResponse, description: 'User deleted' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    const user = await this.userService.remove(id);
    return UserMapper.entityToResponse(user);
  }
}
