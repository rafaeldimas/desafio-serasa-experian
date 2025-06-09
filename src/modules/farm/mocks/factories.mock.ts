import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';
import { UpdateFarmRequest } from '@/modules/farm/dto/update-farm.request';
import { Farm } from '@/modules/farm/entities/farm.entity';
import { FarmService } from '@/modules/farm/farm.service';
import { MockType } from '@/shared/tests/mock-type';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

export function farmRepositoryMockFactory(): MockType<Repository<Farm>> {
  return {
    find: jest.fn().mockReturnValue([farmMockFactory(), farmMockFactory()]),
    findOneBy: jest.fn(({ id }: Partial<Farm>) => farmMockFactory({ id })),
    save: jest.fn((entity: Farm) =>
      plainToClass(Farm, { ...entity, id: 'any_id' }),
    ),
    update: jest.fn().mockReturnValue({ affected: 1 }),
    remove: jest.fn((farm: Farm) =>
      plainToClass(Farm, {
        ...farm,
        id: undefined,
      }),
    ),
  };
}

export function farmServiceMockFactory(): MockType<FarmService> {
  return {
    create: jest.fn((createFarmRequest: CreateFarmRequest) =>
      Promise.resolve(farmMockFactory({ ...createFarmRequest, id: 'any_id' })),
    ),
    findAll: jest.fn(() =>
      Promise.resolve([farmMockFactory(), farmMockFactory()]),
    ),
    findOne: jest.fn((id: string) => Promise.resolve(farmMockFactory({ id }))),
    update: jest.fn((id: string, updateFarmRequest: UpdateFarmRequest) =>
      Promise.resolve(farmMockFactory({ ...updateFarmRequest, id })),
    ),
    remove: jest.fn(() => Promise.resolve(farmMockFactory({ id: undefined }))),
  };
}

export function farmMockFactory(farm?: Partial<Farm>): Farm {
  return plainToClass(Farm, {
    id: 'any_id',
    name: 'any_name',
    totalArea: 30,
    arableArea: 15,
    vegetationArea: 15,
    state: 'SP',
    city: 'Ribeirão Preto',
    growerId: 'any_grower_id',
    ...farm,
  });
}

export function createFarmRequestMockFactory(
  createFarmRequest?: Partial<CreateFarmRequest>,
): CreateFarmRequest {
  return plainToClass(CreateFarmRequest, {
    name: 'any_name',
    totalArea: 30,
    arableArea: 15,
    vegetationArea: 15,
    state: 'SP',
    city: 'Ribeirão Preto',
    growerId: 'any_grower_id',
    ...createFarmRequest,
  });
}

export function updateFarmRequestMockFactory(
  updateFarmRequest?: Partial<UpdateFarmRequest>,
): UpdateFarmRequest {
  return plainToClass(UpdateFarmRequest, {
    name: 'any_name',
    totalArea: 30,
    arableArea: 15,
    vegetationArea: 15,
    state: 'SP',
    city: 'Ribeirão Preto',
    growerId: 'any_grower_id',
    ...updateFarmRequest,
  });
}
