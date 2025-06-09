import { CreateGrowerRequest } from '@/modules/grower/dto/create-grower.request';
import { UpdateGrowerRequest } from '@/modules/grower/dto/update-grower.request';
import { Grower } from '@/modules/grower/entities/grower.entity';
import { GrowerMapper } from '@/modules/grower/grower.mapper';
import { GrowerService } from '@/modules/grower/grower.service';
import { MockType } from '@/shared/tests/mock-type';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';

export function repositoryMockFactory(): MockType<Repository<Grower>> {
  return {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn((entity: Grower) =>
      plainToClass(Grower, { ...entity, id: randomUUID() }),
    ),
    update: jest.fn().mockReturnValue({ affected: 1 }),
    remove: jest.fn(),
  };
}

export function growerServiceMockFactory(): Partial<GrowerService> {
  return {
    create: jest.fn((createGrowerRequest: CreateGrowerRequest) =>
      Promise.resolve(
        growerMockFactory({
          ...GrowerMapper.requestToEntity(createGrowerRequest),
          id: randomUUID(),
        }),
      ),
    ),
    findAll: jest.fn(() =>
      Promise.resolve([growerMockFactory(), growerMockFactory()]),
    ),
    findOne: jest.fn((id: string) =>
      Promise.resolve(growerMockFactory({ id })),
    ),
    update: jest.fn((id: string, updateGrowerRequest: CreateGrowerRequest) =>
      Promise.resolve(
        growerMockFactory({
          ...GrowerMapper.requestToEntity(updateGrowerRequest),
          id,
        }),
      ),
    ),
    remove: jest.fn(() => Promise.resolve(growerMockFactory())),
  };
}

export function growerMockFactory(grower?: Partial<Grower>): Grower {
  return plainToClass(Grower, {
    id: 'any_id',
    name: 'any_name',
    documentNumber: 'any_document_number',
    documentType: 'any_document_type',
    ...grower,
  });
}

export function createGrowerRequestMockFactory(
  createGrowerRequest?: Partial<CreateGrowerRequest>,
): CreateGrowerRequest {
  return plainToClass(CreateGrowerRequest, {
    name: 'any_name',
    document: '920.598.930-46',
    ...createGrowerRequest,
  });
}

export function updateGrowerRequestMockFactory(
  updateGrowerRequest?: Partial<UpdateGrowerRequest>,
): UpdateGrowerRequest {
  return plainToClass(UpdateGrowerRequest, {
    name: 'any_name',
    document: '920.598.930-46',
    ...updateGrowerRequest,
  });
}
