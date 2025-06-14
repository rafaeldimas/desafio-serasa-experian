import { UserResponse } from '@/modules/user/dto/user.response';
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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user.request';
import { UpdateUserRequest } from './dto/update-user.request';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserResponse, description: 'User created' })
  async create(
    @Body() createUserDto: CreateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userService.create(createUserDto);
    return UserMapper.entityToResponse(user);
  }

  @Get()
  @ApiOkResponse({ type: UserResponse, isArray: true, description: 'Users' })
  async findAll(): Promise<UserResponse[]> {
    const users = await this.userService.findAll();
    return UserMapper.entitiesToResponse(users);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponse, description: 'User' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    const user = await this.userService.findOne(id);
    return UserMapper.entityToResponse(user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserResponse, description: 'User updated' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userService.update(id, updateUserDto);
    return UserMapper.entityToResponse(user);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserResponse, description: 'User deleted' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    const user = await this.userService.remove(id);
    return UserMapper.entityToResponse(user);
  }
}
