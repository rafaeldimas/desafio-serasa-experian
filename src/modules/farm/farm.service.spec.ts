import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';
import { UpdateFarmRequest } from '@/modules/farm/dto/update-farm.request';
import { Farm } from '@/modules/farm/entities/farm.entity';
import { FarmNotFoundError } from '@/modules/farm/errors/farm-not-found';
import { FarmMapper } from '@/modules/farm/farm.mapper';
import {
  farmMockFactory,
  farmRepositoryMockFactory,
} from '@/modules/farm/mocks/factories.mock';
import { MockType } from '@/shared/tests/mock-type';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { FarmService } from './farm.service';

describe('FarmService', () => {
  let service: FarmService;
  let repository: MockType<Repository<Farm>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: getRepositoryToken(Farm),
          useFactory: farmRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    repository = module.get<MockType<Repository<Farm>>>(
      getRepositoryToken(Farm),
    );
  });

  describe('create', () => {
    let farm: Farm;
    let farmRequest: CreateFarmRequest;

    beforeAll(async () => {
      farmRequest = farmMockFactory();
      farm = await service.create(farmRequest);
    });

    it('returns a Farm', () => {
      expect(farm).toBeInstanceOf(Farm);
    });

    it('returns a Farm with the id', () => {
      expect(farm.id).toBeDefined();
    });

    it('returns a Farm with the same name', () => {
      expect(farm.name).toEqual(farmRequest.name);
    });

    it('returns a Farm with the same total area', () => {
      expect(farm.totalArea).toEqual(farmRequest.totalArea);
    });

    it('returns a Farm with the same arable area', () => {
      expect(farm.arableArea).toEqual(farmRequest.arableArea);
    });

    it('returns a Farm with the same vegetation area', () => {
      expect(farm.vegetationArea).toEqual(farmRequest.vegetationArea);
    });

    it('returns a Farm with the same state', () => {
      expect(farm.state).toEqual(farmRequest.state);
    });

    it('returns a Farm with the same city', () => {
      expect(farm.city).toEqual(farmRequest.city);
    });

    it('returns a Farm with the same grower id', () => {
      expect(farm.growerId).toEqual(farmRequest.growerId);
    });

    it('calls the repository', () => {
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    let farms: Farm[];

    beforeAll(async () => {
      farms = await service.findAll();
    });

    it('returns a list of Farms', () => {
      expect(farms).toBeInstanceOf(Array);
      farms.forEach((farm) => {
        expect(farm).toBeInstanceOf(Farm);
      });
    });

    it('calls the repository', () => {
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    describe('when finding a Farm', () => {
      const id = '4d102856-12a8-451d-8379-5008c4731653';
      let farm: Farm;

      beforeAll(async () => {
        farm = await service.findOne(id);
      });

      it('returns a Farm', () => {
        expect(farm).toBeInstanceOf(Farm);
      });

      it('returns a Farm with the same id', () => {
        expect(farm.id).toEqual(id);
      });

      it('calls the repository', () => {
        expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      });
    });

    describe('when finding a Farm that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: FarmNotFoundError;

      beforeAll(async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

        try {
          await service.findOne(id);
        } catch (err) {
          error = err as FarmNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a FarmNotFoundError', () => {
        expect(error).toBeInstanceOf(FarmNotFoundError);
      });

      it('throws a FarmNotFoundError with the correct message', () => {
        expect(error.getMessage()).toEqual(`Farm id (${id}) not found`);
      });

      it('throws a FarmNotFoundError with the correct code', () => {
        expect(error.getCode()).toEqual('FARM_NOT_FOUND');
      });
    });
  });

  describe('update', () => {
    describe('when updating a Farm', () => {
      const id = '4d102856-12a8-451d-8379-5008c4731653';
      let farm: Farm;
      let farmRequest: UpdateFarmRequest;

      beforeAll(async () => {
        farmRequest = farmMockFactory();
        farm = await service.update(id, farmRequest);
      });

      it('returns a Farm', () => {
        expect(farm).toBeInstanceOf(Farm);
      });

      it('returns a Farm with the same id', () => {
        expect(farm.id).toEqual(id);
      });

      it('calls the repository', () => {
        expect(repository.update).toHaveBeenCalledWith(
          { id },
          FarmMapper.requestToEntity(farmRequest),
        );
      });
    });

    describe('when updating a Farm that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: FarmNotFoundError;

      beforeAll(async () => {
        jest
          .spyOn(repository, 'update')
          .mockResolvedValueOnce({ affected: 0 } as UpdateResult);

        try {
          await service.update(id, farmMockFactory());
        } catch (err) {
          error = err as FarmNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a FarmNotFoundError', () => {
        expect(error).toBeInstanceOf(FarmNotFoundError);
      });

      it('throws a FarmNotFoundError with the correct message', () => {
        expect(error.getMessage()).toEqual(`Farm id (${id}) not found`);
      });

      it('throws a FarmNotFoundError with the correct code', () => {
        expect(error.getCode()).toEqual('FARM_NOT_FOUND');
      });
    });
  });

  describe('remove', () => {
    describe('when removing a Farm', () => {
      const id = '4d102856-12a8-451d-8379-5008c4731653';
      let farm: Farm;
      let farmMock: Farm;

      beforeAll(async () => {
        farmMock = farmMockFactory({ id });

        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(farmMock);

        farm = await service.remove(id);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('returns a Farm', () => {
        expect(farm).toBeInstanceOf(Farm);
      });

      it('returns a Farm without the id', () => {
        expect(farm.id).toBeUndefined();
      });

      it('returns a Farm with the same name', () => {
        expect(farm.name).toEqual(farmMock.name);
      });

      it('returns a Farm with the same totalArea', () => {
        expect(farm.totalArea).toEqual(farmMock.totalArea);
      });

      it('returns a Farm with the same arableArea', () => {
        expect(farm.arableArea).toEqual(farmMock.arableArea);
      });

      it('returns a Farm with the same vegetationArea', () => {
        expect(farm.vegetationArea).toEqual(farmMock.vegetationArea);
      });

      it('returns a Farm with the same state', () => {
        expect(farm.state).toEqual(farmMock.state);
      });

      it('returns a Farm with the same city', () => {
        expect(farm.city).toEqual(farmMock.city);
      });

      it('returns a Farm with the same growerId', () => {
        expect(farm.growerId).toEqual(farmMock.growerId);
      });

      it('calls the repository', () => {
        expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      });

      it('calls the repository', () => {
        expect(repository.remove).toHaveBeenCalledWith(farmMock);
      });
    });

    describe('when removing a Farm that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: FarmNotFoundError;

      beforeAll(async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

        try {
          await service.remove(id);
        } catch (err) {
          error = err as FarmNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a FarmNotFoundError', () => {
        expect(error).toBeInstanceOf(FarmNotFoundError);
      });

      it('throws a FarmNotFoundError with the correct message', () => {
        expect(error.getMessage()).toEqual(`Farm id (${id}) not found`);
      });

      it('throws a FarmNotFoundError with the correct code', () => {
        expect(error.getCode()).toEqual('FARM_NOT_FOUND');
      });
    });
  });
});
