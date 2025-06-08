import { Injectable } from '@nestjs/common';

import { CreateHarvestRequest } from '@/modules/harvest/dto/create-harvest.request';
import { UpdateHarvestRequest } from '@/modules/harvest/dto/update-harvest.request';
import { Harvest } from '@/modules/harvest/entities/harvest.entity';
import { HarvestNotFoundError } from '@/modules/harvest/errors/harvest-not-found';
import { HarvestMapper } from '@/modules/harvest/harvest.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,
  ) {}

  async create(createHarvestRequest: CreateHarvestRequest): Promise<Harvest> {
    return this.harvestRepository.save(
      HarvestMapper.requestToEntity(createHarvestRequest),
    );
  }

  async findAll(): Promise<Harvest[]> {
    return await this.harvestRepository.find();
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOneBy({ id });
    if (!harvest) {
      throw new HarvestNotFoundError(id);
    }

    return harvest;
  }

  async update(
    id: string,
    updateHarvestRequest: UpdateHarvestRequest,
  ): Promise<Harvest> {
    const result = await this.harvestRepository.update(
      { id },
      HarvestMapper.requestToEntity(updateHarvestRequest),
    );

    if (result.affected === 0) {
      throw new HarvestNotFoundError(id);
    }

    return (await this.harvestRepository.findOneBy({ id })) as Harvest;
  }

  async remove(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOneBy({ id });
    if (!harvest) {
      throw new HarvestNotFoundError(id);
    }

    return await this.harvestRepository.remove(harvest);
  }
}
