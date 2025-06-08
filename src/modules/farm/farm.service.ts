import { Injectable } from '@nestjs/common';

import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';
import { UpdateFarmRequest } from '@/modules/farm/dto/update-farm.request';
import { Farm } from '@/modules/farm/entities/farm.entity';
import { FarmNotFoundError } from '@/modules/farm/errors/farm-not-found';
import { FarmMapper } from '@/modules/farm/farm.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}
  async create(createFarmRequest: CreateFarmRequest): Promise<Farm> {
    return await this.farmRepository.save(
      FarmMapper.requestToEntity(createFarmRequest),
    );
  }

  async findAll(): Promise<Farm[]> {
    return await this.farmRepository.find();
  }

  async findOne(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findOneBy({ id });
    if (!farm) {
      throw new FarmNotFoundError(id);
    }

    return farm;
  }

  async update(
    id: string,
    updateFarmRequest: UpdateFarmRequest,
  ): Promise<Farm> {
    const result = await this.farmRepository.update(
      { id },
      FarmMapper.requestToEntity(updateFarmRequest),
    );

    if (result.affected === 0) {
      throw new FarmNotFoundError(id);
    }

    return (await this.farmRepository.findOneBy({ id })) as Farm;
  }

  async remove(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findOneBy({ id });
    if (!farm) {
      throw new FarmNotFoundError(id);
    }

    return await this.farmRepository.remove(farm);
  }
}
