import { Injectable } from '@nestjs/common';
import { CreateGrowerDto } from './dto/create-grower.dto';
import { UpdateGrowerDto } from './dto/update-grower.dto';

@Injectable()
export class GrowerService {
  create(createGrowerDto: CreateGrowerDto) {
    return 'This action adds a new grower';
  }

  findAll() {
    return `This action returns all grower`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grower`;
  }

  update(id: number, updateGrowerDto: UpdateGrowerDto) {
    return `This action updates a #${id} grower`;
  }

  remove(id: number) {
    return `This action removes a #${id} grower`;
  }
}
