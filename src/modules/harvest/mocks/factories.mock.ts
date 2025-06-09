import { CreateHarvestRequest } from '@/modules/harvest/dto/create-harvest.request';
import { UpdateHarvestRequest } from '@/modules/harvest/dto/update-harvest.request';
import { Harvest } from '@/modules/harvest/entities/harvest.entity';
import { HarvestService } from '@/modules/harvest/harvest.service';
import { MockType } from '@/shared/tests/mock-type';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

export function harvestRepositoryMockFactory(): MockType<Repository<Harvest>> {
  return {
    find: jest
      .fn()
      .mockReturnValue([harvestMockFactory(), harvestMockFactory()]),
    findOneBy: jest.fn(({ id }: Partial<Harvest>) =>
      harvestMockFactory({ id }),
    ),
    save: jest.fn((entity: Harvest) =>
      plainToClass(Harvest, { ...entity, id: 'any_id' }),
    ),
    update: jest.fn().mockReturnValue({ affected: 1 }),
    remove: jest.fn((harvest: Harvest) =>
      plainToClass(Harvest, {
        ...harvest,
        id: undefined,
      }),
    ),
  };
}

export function harvestServiceMockFactory(): MockType<HarvestService> {
  return {
    create: jest.fn((createHarvestRequest: CreateHarvestRequest) =>
      Promise.resolve(
        harvestMockFactory({ ...createHarvestRequest, id: 'any_id' }),
      ),
    ),
    findAll: jest.fn(() =>
      Promise.resolve([harvestMockFactory(), harvestMockFactory()]),
    ),
    findOne: jest.fn((id: string) =>
      Promise.resolve(harvestMockFactory({ id })),
    ),
    update: jest.fn((id: string, updateHarvestRequest: UpdateHarvestRequest) =>
      Promise.resolve(harvestMockFactory({ ...updateHarvestRequest, id })),
    ),
    remove: jest.fn(() =>
      Promise.resolve(harvestMockFactory({ id: undefined })),
    ),
  };
}

export function harvestMockFactory(harvest?: Partial<Harvest>): Harvest {
  return plainToClass(Harvest, {
    id: 'any_id',
    year: 2022,
    crops: ['Arroz', 'Feijão'],
    farmId: 'any_farm_id',
    ...harvest,
  });
}

export function createHarvestRequestMockFactory(
  createHarvestRequest?: Partial<Harvest>,
): CreateHarvestRequest {
  return plainToClass(CreateHarvestRequest, {
    year: 2022,
    crops: ['Arroz', 'Feijão'],
    farmId: 'any_farm_id',
    ...createHarvestRequest,
  });
}

export function updateHarvestRequestMockFactory(
  updateHarvestRequest?: Partial<Harvest>,
): UpdateHarvestRequest {
  return plainToClass(UpdateHarvestRequest, {
    year: 2022,
    crops: ['Arroz', 'Feijão'],
    farmId: 'any_farm_id',
    ...updateHarvestRequest,
  });
}
