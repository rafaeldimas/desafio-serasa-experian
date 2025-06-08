import { Injectable } from '@nestjs/common';

import { CreateGrowerRequest } from '@/modules/grower/dto/create-grower.request';
import { UpdateGrowerRequest } from '@/modules/grower/dto/update-grower.request';
import { Grower } from '@/modules/grower/entities/grower.entity';
import { GrowerNotFoundError } from '@/modules/grower/errors/grower-not-found';
import { GrowerMapper } from '@/modules/grower/grower.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GrowerService {
  constructor(
    @InjectRepository(Grower)
    private readonly growerRepository: Repository<Grower>,
  ) {}
  async create(createGrowerRequest: CreateGrowerRequest): Promise<Grower> {
    return await this.growerRepository.save(
      GrowerMapper.requestToEntity(createGrowerRequest),
    );
  }

  async findAll(): Promise<Grower[]> {
    const growers = await this.growerRepository.find();
    return growers;
  }

  async findOne(id: string): Promise<Grower> {
    const grower = await this.growerRepository.findOneBy({ id });
    if (!grower) {
      throw new GrowerNotFoundError(id);
    }
    return grower;
  }

  async update(
    id: string,
    UpdateGrowerRequest: UpdateGrowerRequest,
  ): Promise<Grower> {
    const partialEntity = GrowerMapper.requestToEntity(UpdateGrowerRequest);

    const result = await this.growerRepository.update({ id }, partialEntity);

    if (result.affected === 0) {
      throw new GrowerNotFoundError(id);
    }

    return (await this.growerRepository.findOneBy({ id })) as Grower;
  }

  async remove(id: string): Promise<Grower> {
    const grower = await this.growerRepository.findOneBy({ id });
    if (!grower) {
      throw new GrowerNotFoundError(id);
    }

    return await this.growerRepository.remove(grower);
  }
}
