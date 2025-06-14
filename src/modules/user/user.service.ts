import { User } from '@/modules/user/entities/user.entity';
import { UserNotFound } from '@/modules/user/errors/user-not-found';
import { UserMapper } from '@/modules/user/user.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './dto/create-user.request';
import { UpdateUserRequest } from './dto/update-user.request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserRequest): Promise<User> {
    return await this.userRepository.save(
      UserMapper.requestToEntity(createUserDto),
    );
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UserNotFound(id);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserRequest): Promise<User> {
    const partialEntity = UserMapper.requestToEntity(updateUserDto);

    const result = await this.userRepository.update({ id }, partialEntity);

    if (result.affected === 0) {
      throw new UserNotFound(id);
    }

    return (await this.userRepository.findOneBy({ id })) as User;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UserNotFound(id);
    }
    return await this.userRepository.remove(user);
  }
}
